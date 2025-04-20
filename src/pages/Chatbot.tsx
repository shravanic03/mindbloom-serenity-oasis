"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatMessage from "@/components/ChatMessage";
import Button from "@/components/Button";
import {
  Send,
  PlusCircle,
  Loader2,
  Mic,
  Volume2,
  VolumeX,
  AlertCircle,
} from "lucide-react";

// Base URL for API endpoints
const API_BASE_URL = "http://127.0.0.1:8000";

const Chatbot = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [messages, setMessages] = useState<
    Array<{ type: "user" | "bot"; content: string; timestamp: Date }>
  >([
    {
      type: "bot",
      content:
        "Hello, I'm PMHS's virtual assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioSupported, setAudioSupported] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if audio recording is supported
  useEffect(() => {
    const checkAudioSupport = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setAudioSupported(false);
        console.error("MediaDevices API not supported in this browser");
        return;
      }

      try {
        // Test if we can access the microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // Stop all tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());
        setAudioSupported(true);
      } catch (err) {
        console.error("Microphone access error:", err);
        setAudioSupported(false);
      }
    };

    checkAudioSupport();
  }, []);

  // Clean up media resources when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [audio]);

  const quickPrompts = [
    "I'm feeling anxious",
    "I'm having trouble sleeping",
    "I need help with stress",
    "I'm feeling sad today",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage = {
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the API
      const history = messages.concat(userMessage).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      console.log("Sending to API:", { history });

      // Send request to chatbot API using the correct endpoint and format
      const response = await axios.post(`${API_BASE_URL}/get-answer`, {
        history,
      });

      console.log("API response:", response.data);

      const botResponse = response.data.answer || response.data.response || "";

      if (!botResponse) {
        throw new Error("Empty response from chatbot API");
      }

      const botMessage = {
        type: "bot" as const,
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(
        "Sorry, I couldn't connect to my brain. Please try again in a moment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const playSpeech = async (text: string) => {
    try {
      setIsSpeaking(true);
      setError(null);

      console.log("Requesting speech synthesis for:", text);

      const audioResponse = await axios.post(
        `${API_BASE_URL}/text-to-speech`,
        {
          text,
          language: "en-US",
        },
        { responseType: "blob" }
      );

      const contentType = audioResponse.headers["content-type"] || "audio/wav"; // default fallback
      console.log("Received content-type:", contentType);

      const audioBlob = new Blob([audioResponse.data], { type: contentType });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audioElement = new Audio();

      audioElement.oncanplaythrough = () => {
        console.log("Audio can play through");
      };

      audioElement.onplay = () => console.log("Audio started playing");

      audioElement.onended = () => {
        console.log("Audio playback completed");
        setIsSpeaking(false);
      };

      audioElement.src = audioUrl;
      audioElement.load();
      setAudio(audioElement);

      await audioElement.play().catch((err) => {
        console.error("Error playing audio:", err);
        setIsSpeaking(false);
        setError(
          "Couldn't play the audio. This might be due to browser restrictions or unsupported format."
        );
      });
    } catch (error) {
      console.error("Error generating speech:", error);
      setError(
        "I couldn't generate speech at the moment. Please try again later."
      );
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audio) {
      audio.pause();
      audio.src = "";
      setAudio(null);
      setIsSpeaking(false);
    }
  };

  // Function to convert audio blob to WAV format
  const convertToWav = async (audioBlob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        // Create an audio context
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        // Create a file reader to read the blob
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            // Decode the audio data
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Convert to WAV format
            const wavBlob = audioBufferToWav(audioBuffer);
            resolve(wavBlob);
          } catch (error) {
            console.error("Error decoding audio data:", error);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading audio blob:", error);
          reject(error);
        };

        // Read the blob as an array buffer
        reader.readAsArrayBuffer(audioBlob);
      } catch (error) {
        console.error("Error in convertToWav:", error);
        reject(error);
      }
    });
  };

  // Function to convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    // Create the buffer
    const length = buffer.length * numOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);

    // Write the WAV header
    // "RIFF" chunk descriptor
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, "WAVE");

    // "fmt " sub-chunk
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, format, true); // audio format
    view.setUint16(22, numOfChannels, true); // number of channels
    view.setUint32(24, sampleRate, true); // sample rate
    view.setUint32(28, sampleRate * numOfChannels * 2, true); // byte rate
    view.setUint16(32, numOfChannels * 2, true); // block align
    view.setUint16(34, bitDepth, true); // bits per sample

    // "data" sub-chunk
    writeString(view, 36, "data");
    view.setUint32(40, length, true); // data chunk size

    // Write the PCM samples
    const channelData = [];
    for (let i = 0; i < numOfChannels; i++) {
      channelData.push(buffer.getChannelData(i));
    }

    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        // Convert float to int16
        const sample = Math.max(-1, Math.min(1, channelData[channel][i]));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: "audio/wav" });
  };

  // Helper function to write a string to a DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const handleAudioRecording = async () => {
    // Clear any previous errors
    setError(null);

    if (!audioSupported) {
      setError(
        "Audio recording is not supported in your browser or microphone access is denied."
      );
      return;
    }

    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      console.log("Microphone access granted");

      // Create audio context for visualization (optional)
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);

      // Set up media recorder with proper MIME type
      // Use audio/webm for better compatibility
      const options = { mimeType: "audio/webm" };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Received audio chunk:", event.data.size, "bytes");
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        console.log("Recording started");
        setIsRecording(true);
      };

      mediaRecorder.onstop = async () => {
        console.log("Recording stopped, processing audio...");
        setIsRecording(false);

        if (audioChunks.length === 0) {
          console.error("No audio data recorded");
          setError(
            "No audio was recorded. Please try again and speak clearly."
          );
          return;
        }

        try {
          setIsLoading(true);

          // Create audio blob with WebM MIME type
          const webmBlob = new Blob(audioChunks, { type: "audio/webm" });
          console.log("Created WebM audio blob:", webmBlob.size, "bytes");

          // Convert WebM to WAV format
          console.log("Converting WebM to WAV format...");
          let wavBlob;
          try {
            wavBlob = await convertToWav(webmBlob);
            console.log("Converted to WAV format:", wavBlob.size, "bytes");
          } catch (conversionError) {
            console.error("Error converting to WAV:", conversionError);
            setError(
              "I couldn't convert your audio to the required format. Please try typing your message instead."
            );
            setIsLoading(false);
            return;
          }

          // Create form data with WAV file
          const formData = new FormData();
          formData.append("file", wavBlob, "audio.wav");

          console.log("Sending WAV audio for transcription...");

          // Send audio for transcription using the correct endpoint
          const transcriptionResponse = await axios.post(
            `${API_BASE_URL}/speech-to-text`,
            formData
          );

          console.log("Transcription response:", transcriptionResponse.data);

          const transcribedText = transcriptionResponse.data.transcript || "";

          if (!transcribedText) {
            console.error("No transcription returned from API");
            setError(
              "I couldn't understand what you said. Please try again or type your message."
            );
            setIsLoading(false);
            return;
          }

          // Add user message with transcribed text
          const userMessage = {
            type: "user" as const,
            content: transcribedText,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, userMessage]);

          // Convert messages to the format expected by the API
          const history = messages.concat(userMessage).map((msg) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content,
          }));

          console.log("Sending transcribed text to chatbot API...");

          // Send request to chatbot API
          const chatbotResponse = await axios.post(
            `${API_BASE_URL}/get-answer`,
            { history }
          );

          console.log("Chatbot response:", chatbotResponse.data);

          const botResponse =
            chatbotResponse.data.answer || chatbotResponse.data.response || "";

          if (!botResponse) {
            throw new Error("Empty response from chatbot API");
          }

          const botMessage = {
            type: "bot" as const,
            content: botResponse,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);

          // Play chatbot response as speech
          playSpeech(botResponse);
        } catch (error) {
          console.error("Error processing voice input:", error);
          setError(
            "I couldn't process your voice input. Please try again or type your message instead."
          );
        } finally {
          setIsLoading(false);
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("There was an error with the recording. Please try again.");
        setIsRecording(false);
      };

      // Start recording
      mediaRecorder.start();
      console.log("MediaRecorder started");

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          console.log("Stopping recording after timeout");
          mediaRecorder.stop();
        }
      }, 5000);
    } catch (error) {
      console.error("Error setting up audio recording:", error);
      setIsRecording(false);
      setError(
        "I couldn't access your microphone. Please check your browser permissions and try again."
      );
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReadMessage = (message: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      playSpeech(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-PMHS-purple text-white">
                <h1 className="text-xl font-semibold">PMHS Assistant</h1>
                <p className="text-sm opacity-90">
                  A supportive chat experience
                </p>
              </div>

              {/* Chat Messages Container */}
              <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="group">
                      <ChatMessage
                        type={message.type}
                        message={message.content}
                        timestamp={message.timestamp}
                      />
                      {message.type === "bot" && (
                        <button
                          onClick={() => handleReadMessage(message.content)}
                          className="ml-2 p-1 text-gray-400 hover:text-PMHS-purple opacity-0 group-hover:opacity-100 transition-opacity"
                          title={isSpeaking ? "Stop speaking" : "Read aloud"}
                          disabled={!audioSupported}
                        >
                          {isSpeaking ? (
                            <VolumeX size={16} />
                          ) : (
                            <Volume2 size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 mb-2">
                        <Loader2 className="h-5 w-5 animate-spin text-PMHS-purple" />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex justify-start">
                      <div className="bg-red-50 text-red-700 rounded-2xl rounded-tl-none px-4 py-3 mb-2 flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-PMHS-purple/10 text-PMHS-purple hover:bg-PMHS-purple/20 transition-colors"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <textarea
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-PMHS-purple focus:border-PMHS-purple resize-none"
                    placeholder="Type your message..."
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isRecording}
                  />
                  <div className="flex flex-col gap-2 self-end">
                    <Button
                      onClick={handleAudioRecording}
                      disabled={isLoading || isRecording || !audioSupported}
                      variant="outline"
                      className={isRecording ? "bg-red-100" : ""}
                      title={
                        audioSupported
                          ? "Record voice message"
                          : "Microphone access not available"
                      }
                    >
                      {isRecording ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading || isRecording}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {isRecording
                      ? "Recording... (5 seconds)"
                      : audioSupported
                      ? "Press the microphone button to use voice input"
                      : "Voice input is not available in your browser"}
                  </p>
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 flex items-center gap-1"
                    >
                      <VolumeX size={12} /> Stop speaking
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-PMHS-pink-light/30 p-6 rounded-xl border border-PMHS-pink/10">
              <h2 className="text-lg font-semibold mb-3">Need more support?</h2>
              <p className="text-gray-700 mb-4">
                While our chatbot can provide basic guidance, it's not a
                replacement for professional help. If you're experiencing severe
                symptoms or need personalized support, consider booking a
                session with one of our therapists.
              </p>
              <Button variant="gradient" to="/appointment">
                <PlusCircle className="h-4 w-4 mr-2" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chatbot;
