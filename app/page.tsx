"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import {
  ChevronRight,
  Code,
  FileSearch,
  ShieldCheck,
  Zap,
  Bot,
  CreditCard,
} from "lucide-react";

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#14f195]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#14f195]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold">SOLESEC</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#home"
              className="cursor-pointer hover:text-[#14f195] transition-colors">
              Home
            </Link>
            <Link
              href="#about"
              className="cursor-pointer hover:text-[#14f195] transition-colors">
              About
            </Link>
            <Link
              href="#services"
              className="cursor-pointer hover:text-[#14f195] transition-colors">
              Services
            </Link>
            <Link
              href="#features"
              className="cursor-pointer hover:text-[#14f195] transition-colors">
              Features
            </Link>
            <Link
              href="#contact"
              className="cursor-pointer hover:text-[#14f195] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              className="hidden md:inline-flex border-[#0ed180] bg-6 text-white bg-[#14f195]/30 hover:bg-[#14f195] hover:text-black transition-colors">
              <FileSearch className="w-4 h-4 mr-2" />
              Request Audit
            </Button>

            <Link href="/chatbot">
              <Button
                variant="outline"
                className="border-[#9945ff] text-white bg-[#9945ff]/20 hover:bg-[#9945ff] hover:text-black transition-colors">
                <Bot className="w-4 h-4 mr-2" />
                Chat with Code
              </Button>
            </Link>
          </div>
          <Button variant="ghost" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="home"
          className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <FadeInSection>
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl pb-2 md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#14f195] to-[#9945ff] bg-clip-text text-transparent">
                AI-Powered Solana Smart Contract Auditing
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Leveraging open-source intelligence for unparalleled security
              </p>
              <p className="mb-8 text-gray-400">
                solsec.xyz utilizes cutting-edge AI technology and comprehensive
                open-source report analysis to provide fully automated,
                state-of-the-art security audits for Solana smart contracts.
              </p>
              <Button className="bg-[#14f195] hover:bg-[#9945ff] text-black font-bold">
                Get Started
              </Button>
            </div>
          </FadeInSection>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/file.png"
              alt="AI analyzing Solana smart contracts"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </section>
        {/* About Us Section */}
        <section
          id="about"
          className="py-20 bg-gradient-to-b from-black to-[#14f195]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-8 text-center text-[#14f195]">
                About Our Automated Workflow
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 md:pr-10">
                  <p className="text-gray-300 mb-4">
                    At solsec.xyz, we've revolutionized the smart contract
                    auditing process with our fully automated AI-powered system.
                    Our advanced RAG (Retrieval-Augmented Generation) agent is
                    at the core of our operations, handling all aspects of the
                    auditing process.
                  </p>
                  <p className="text-gray-300">
                    By leveraging machine learning and vast open-source
                    intelligence, our AI agent can detect vulnerabilities and
                    potential exploits with unprecedented accuracy and speed,
                    all without human intervention.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-end mt-10 md:mt-0">
                  <Image
                    src="/images/solana-banner.png"
                    alt="AI and Blockchain Intersection"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* What We Offer Section */}
        <section
          id="services"
          className="py-20 bg-gradient-to-b from-[#14f195]/10 to-[#9945ff]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Automated Smart Contract Audits",
                    icon: Code,
                    description:
                      "AI-driven analysis of your Solana smart contracts for vulnerabilities and optimizations.",
                  },
                  {
                    title: "Continuous Security Monitoring",
                    icon: ShieldCheck,
                    description:
                      "24/7 automated evaluation of your project's security posture and risk profile.",
                  },
                  {
                    title: "AI-Powered Code Reviews",
                    icon: FileSearch,
                    description:
                      "Detailed examination of your codebase using advanced natural language processing.",
                  },
                  {
                    title: "Real-time Vulnerability Scanning",
                    icon: Zap,
                    description:
                      "Instant detection and reporting of potential threats in your smart contracts.",
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <service.icon className="w-12 h-12 mb-4 text-[#14f195]" />
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className="hidden md:inline-flex border-[#0ed180] bg-6 text-white bg-[#14f195]/30 hover:bg-[#14f195] hover:text-black transition-colors">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gradient-to-b from-[#9945ff]/10 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#9945ff]">
                Our AI-Powered Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Advanced Machine Learning",
                    description:
                      "Utilize state-of-the-art algorithms for in-depth contract analysis.",
                  },
                  {
                    title: "Open-Source Intelligence",
                    description:
                      "Leverage vast open-source data to identify potential vulnerabilities.",
                  },
                  {
                    title: "Chat with Code",
                    description:
                      "Chat with our AI agent to get answers to several vulnerabilities to the code.",
                  },
                  {
                    title: "Self-Improving Algorithms",
                    description:
                      "Our AI constantly learns from new data to enhance its auditing capabilities.",
                  },
                  {
                    title: "Comprehensive Reporting",
                    description:
                      "Detailed, AI-generated audit reports with actionable insights.",
                  },
                  {
                    title: "Lightning-Fast Turnaround",
                    description:
                      "Receive fully automated audit results in minutes, not days or weeks.",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <Bot className="w-12 h-12 mb-4 text-[#9945ff]" />
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-black to-[#14f195]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">
                How Our AI Works
              </h2>
              <div className="flex flex-col md:flex-row justify-between items-center">
                {[
                  {
                    title: "Submit Your Code",
                    description:
                      "Upload your Solana smart contracts to our secure platform.",
                  },
                  {
                    title: "AI Analysis",
                    description:
                      "Our RAG agent performs a deep, automated analysis of your code.",
                  },
                  {
                    title: "Vulnerability Detection",
                    description:
                      "AI identifies potential security issues and optimizations.",
                  },
                  {
                    title: "Automated Report Generation",
                    description:
                      "Receive a comprehensive, AI-generated audit report instantly.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center mb-8 md:mb-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white bg-black bg-opacity-70 rounded-full w-14 h-14 flex items-center justify-center border-2 border-[#14f195]/30">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-center">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-[#14f195]/10 to-[#9945ff]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">
                Why Choose solsec.xyz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI-Powered Precision",
                    description:
                      "Our advanced AI algorithms provide unparalleled accuracy in vulnerability detection.",
                  },
                  {
                    title: "Fully Automated Process",
                    description:
                      "From code submission to report generation, our entire workflow is automated for speed and consistency.",
                  },
                  {
                    title: "Solana Ecosystem Expertise",
                    description:
                      "Our AI is specifically trained on the intricacies of the Solana blockchain.",
                  },
                ].map((reason, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {reason.title}
                      </h3>
                      <p className="text-gray-400">{reason.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Recent Audits Section */}
        <section className="py-20 bg-gradient-to-b from-[#9945ff]/10 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#9945ff]">
                Recent Automated Audits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "SolanaSwap",
                    description: "Decentralized exchange protocol",
                  },
                  {
                    name: "LunarNFT",
                    description: "NFT marketplace and minting platform",
                  },
                  {
                    name: "SolStake",
                    description: "Staking and yield farming protocol",
                  },
                ].map((audit, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {audit.name}
                      </h3>
                      <p className="text-gray-400 mb-4">{audit.description}</p>
                      <Button
                        variant="outline"
                        className="w-full bg-[#9945ff]/10 backdrop-blur-sm border-[#9945ff]/30 text-[#9945ff] hover:bg-[#9945ff]/20 hover:border-[#9945ff]/50 transition-all duration-300 shadow-[#9945ff]/20 shadow-sm">
                        View Audit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="inline-flex items-center px-6 py-3 text-lg bg-[#512da8]/10 backdrop-blur-sm border-[#512da8]/30 text-[#9945FF] hover:bg-[#512da8]/20 hover:border-[#512da8]/50 hover:scale-105 transition-all duration-300 ease-in-out hover:text-purple-300 shadow-[#512da8]/20 shadow-sm group">
                  View All Case Studies
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-black to-[#14f195]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Whitman",
                    company: "SolanaSwap",
                    quote:
                      "solsec.xyz's AI-powered analysis caught vulnerabilities that other auditors missed. The speed and accuracy are unmatched!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                  },
                  {
                    name: "Maria Garcia",
                    company: "LunarNFT",
                    quote:
                      "The automated auditing process saved us weeks of time. The AI's insights were incredibly valuable for our NFT platform.",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                  },
                  {
                    name: "David Chang",
                    company: "SolStake",
                    quote:
                      "Impressed by the thoroughness of the AI audit. The continuous monitoring gives us peace of mind as we develop new features.",
                    image: "https://randomuser.me/api/portraits/men/75.jpg",
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <p className="text-gray-300 mb-4">
                        {`"${testimonial.quote}"`}
                      </p>
                      <div className="flex items-center">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-[#14f195] text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Payment Section */}
        <section className="py-20 bg-gradient-to-b from-[#14f195]/10 to-[#9945ff]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">
                Flexible Payment Options
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <Card className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300 w-full md:w-1/3">
                  <CardContent className="p-6">
                    <CreditCard className="w-12 h-12 mb-4 text-[#14f195]" />
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Traditional Payment
                    </h3>
                    <p className="text-gray-400 mb-4">
                      We accept all major credit cards and bank transfers for
                      your convenience.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300 w-full md:w-1/3">
                  <CardContent className="p-6">
                    <svg
                      className="w-12 h-12 mb-4 text-[#9945ff]"
                      viewBox="0 0 397.7 311.7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                        fill="currentColor"
                      />
                      <path
                        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                        fill="currentColor"
                      />
                      <path
                        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                        fill="currentColor"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      SOL Payments
                    </h3>
                    <p className="text-gray-400 mb-4">
                      We now accept SOL for all our services, embracing the
                      Solana ecosystem.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-b from-[#9945ff]/10 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-4xl font-bold mb-2 text-center text-[#9945ff]">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Have questions or need assistance? Our team is here to help.
                Reach out to us using the form below.
              </p>
              <div className="max-w-5xl mx-auto">
                <div className="bg-black/30 p-8 rounded-lg border border-[#9945ff]/20 shadow-lg">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 md:pr-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your Name"
                          className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-500 focus:border-[#14f195] transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-500 focus:border-[#14f195] transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-300 mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder={`What's this about?`}
                          className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-500 focus:border-[#14f195] transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 md:pl-4">
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message here..."
                          className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-500 focus:border-[#14f195] transition-colors h-[calc(100%-2.5rem)]"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end mt-4">
                      <Button className="px-8 py-2 bg-gradient-to-r from-[#14f195] to-[#9945ff] hover:from-[#9945ff] hover:to-[#14f195] text-black font-bold transition-all duration-300 transform hover:scale-105">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <footer className="bg-black text-gray-400 py-8 border-t border-[#14f195]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 mb-4 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#14f195]">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-xl font-bold text-white">sol7audit</span>
              </Link>
              <p className="text-sm">
                AI-Powered Solana Smart Contract Auditing
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#home"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#services"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Smart Contract Audits
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Security Assessments
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Code Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Vulnerability Scanning
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#privacy-policy"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#terms-of-service"
                    className="cursor-pointer hover:text-[#14f195] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#14f195]/10 mt-8 pt-8 text-sm text-center">
            © {new Date().getFullYear()} solesec.xyz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}