"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Code, ShieldCheck, Zap } from "lucide-react"

const FadeInSection = ({ children }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  )
}

export function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#14f195]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#14f195]"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold">sol7audit</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="hover:text-[#14f195] transition-colors">Home</Link>
            <Link href="#" className="hover:text-[#14f195] transition-colors">About</Link>
            <Link href="#" className="hover:text-[#14f195] transition-colors">Services</Link>
            <Link href="#" className="hover:text-[#14f195] transition-colors">Features</Link>
            <Link href="#" className="hover:text-[#14f195] transition-colors">Contact</Link>
          </nav>
          <Button variant="outline" className="hidden md:inline-flex border-[#14f195] text-[#14f195] hover:bg-[#14f195] hover:text-black transition-colors">
            Request Audit
          </Button>
          <Button variant="ghost" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <FadeInSection>
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#14f195] to-[#9945ff] bg-clip-text text-transparent">
                AI-Powered Solana Smart Contract Auditing
              </h1>
              <p className="text-xl mb-6 text-gray-300">
                Leveraging open-source intelligence for unparalleled security
              </p>
              <p className="mb-8 text-gray-400">
                sol7audit.com utilizes cutting-edge AI technology and comprehensive open-source report analysis to provide fully automated, state-of-the-art security audits for Solana smart contracts.
              </p>
              <Button className="bg-[#14f195] hover:bg-[#9945ff] text-black font-bold">Get Started</Button>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                alt="AI analyzing Solana smart contracts"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </FadeInSection>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-gradient-to-b from-black to-[#14f195]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-8 text-center text-[#14f195]">About Our Automated Workflow</h2>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <p className="text-gray-300 mb-4">
                    At sol7audit.com, we've revolutionized the smart contract auditing process with our fully automated AI-powered system. Our advanced RAG (Retrieval-Augmented Generation) agent is at the core of our operations, handling all aspects of the auditing process.
                  </p>
                  <p className="text-gray-300">
                    By leveraging machine learning and vast open-source intelligence, our AI agent can detect vulnerabilities and potential exploits with unprecedented accuracy and speed, all without human intervention.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-10">
                  <Image
                    src="https://images.unsplash.com/photo-1639803938107-1e5a67d959d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
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
        <section className="py-20 bg-gradient-to-b from-[#14f195]/10 to-[#9945ff]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Automated Smart Contract Audits", icon: Code, description: "AI-driven analysis of your Solana smart contracts for vulnerabilities and optimizations." },
                  { title: "Continuous Security Monitoring", icon: ShieldCheck, description: "24/7 automated evaluation of your project's security posture and risk profile." },
                  { title: "AI-Powered Code Reviews", icon: FileSearch, description: "Detailed examination of your codebase using advanced natural language processing." },
                  { title: "Real-time Vulnerability Scanning", icon: Zap, description: "Instant detection and reporting of potential threats in your smart contracts." }
                ].map((service, index) => (
                  <Card key={index} className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <service.icon className="w-12 h-12 mb-4 text-[#14f195]" />
                      <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      <Button variant="outline" className="w-full border-[#14f195] text-[#14f195] hover:bg-[#14f195] hover:text-black">Learn More</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-[#9945ff]/10 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#9945ff]">Our AI-Powered Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Advanced Machine Learning", description: "Utilize state-of-the-art algorithms for in-depth contract analysis." },
                  { title: "Open-Source Intelligence", description: "Leverage vast open-source data to identify potential vulnerabilities." },
                  { title: "Automated Monitoring", description: "Continuous scanning and alerts for emerging threats and vulnerabilities." },
                  { title: "Self-Improving Algorithms", description: "Our AI constantly learns from new data to enhance its auditing capabilities." },
                  { title: "Comprehensive Reporting", description: "Detailed, AI-generated audit reports with actionable insights." },
                  { title: "Lightning-Fast Turnaround", description: "Receive fully automated audit results in minutes, not days or weeks." }
                ].map((feature, index) => (
                  <Card key={index} className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <Bot className="w-12 h-12 mb-4 text-[#9945ff]" />
                      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
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
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">How Our AI Works</h2>
              <div className="flex flex-col md:flex-row justify-between items-center">
                {[
                  { title: "Submit Your Code", description: "Upload your Solana smart contracts to our secure platform." },
                  { title: "AI Analysis", description: "Our RAG agent performs a deep, automated analysis of your code." },
                  { title: "Vulnerability Detection", description: "AI identifies potential security issues and optimizations." },
                  { title: "Automated Report Generation", description: "Receive a comprehensive, AI-generated audit report instantly." }
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center mb-8 md:mb-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-black">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400 text-center">{step.description}</p>
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
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">Why Choose sol7audit.com</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "AI-Powered Precision", description: "Our advanced AI algorithms provide unparalleled accuracy in vulnerability detection." },
                  { title: "Fully Automated Process", description: "From code submission to report generation, our entire workflow is automated for speed and consistency." },
                  { title: "Solana Ecosystem Expertise", description: "Our AI is specifically trained on the intricacies of the Solana blockchain." }
                ].map((reason, index) => (
                  <Card key={index} className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
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
              <h2 className="text-3xl font-bold mb-12 text-center text-[#9945ff]">Recent Automated Audits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "SolanaSwap", description: "Decentralized exchange protocol" },
                  { name: "LunarNFT", description: "NFT marketplace and minting platform" },
                  { name: "SolStake", description: "Staking and yield farming protocol" }
                ].map((audit, index) => (
                  <Card key={index} className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{audit.name}</h3>
                      <p className="text-gray-400 mb-4">{audit.description}</p>
                      <Button variant="outline" className="w-full border-[#9945ff] text-[#9945ff] hover:bg-[#9945ff] hover:text-black">View Audit</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button variant="outline" className="inline-flex items-center border-[#9945ff] text-[#9945ff] hover:bg-[#9945ff] hover:text-black">
                  View All Case Studies
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-black to-[#14f195]/10">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Alex Whitman", company: "SolanaSwap", quote: "sol7audit.com's AI-powered analysis caught vulnerabilities that other auditors missed. The speed and accuracy are unmatched!" },
                  { name: "Maria Garcia", company: "LunarNFT", quote: "The automated auditing process saved us weeks of time. The AI's insights were incredibly valuable for our NFT platform." },
                  { name: "David Chang", company: "SolStake", quote: "Impressed by the thoroughness of the AI audit. The continuous monitoring gives us peace of mind as we develop new features." }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <p className="text-gray-300 mb-4">{`"${testimonial.quote}"`}</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] flex items-center justify-center mr-4">
                          <span className="text-xl font-bold text-black">{testimonial.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonial.name}</p>
                          <p className="text-[#14f195] text-sm">{testimonial.company}</p>
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
              <h2 className="text-3xl font-bold mb-12 text-center text-[#14f195]">Flexible Payment Options</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <Card className="bg-black/50 border-[#14f195]/20 hover:bg-[#14f195]/10 transition-all duration-300 w-full md:w-1/3">
                  <CardContent className="p-6">
                    <CreditCard className="w-12 h-12 mb-4 text-[#14f195]" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Traditional Payment</h3>
                    <p className="text-gray-400 mb-4">We accept all major credit cards and bank transfers for your convenience.</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/50 border-[#9945ff]/20 hover:bg-[#9945ff]/10 transition-all duration-300 w-full md:w-1/3">
                  <CardContent className="p-6">
                    <svg className="w-12 h-12 mb-4 text-[#9945ff]" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M64.6 237.9C2.4 141.9 37.7 17.5 138.6 1.3c58.6-9.4 118.1 16.8 152.3 66 34.2-49.2 93.7-75.4 152.3-66 100.9 16.2 136.2 140.6 74 236.6-46.5 71.9-133.8 128.9-226.3 128.9-92.5 0-179.8-57-226.3-128.9z" fill="currentColor"/>
                    </svg>
                    <h3 className="text-xl font-semibold mb-2 text-white">SOL Payments</h3>
                    <p className="text-gray-400 mb-4">We now accept SOL for all our services, embracing the Solana ecosystem.</p>
                  </CardContent>
                </Card>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-[#9945ff]/10 to-black">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-12 text-center text-[#9945ff]">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <form className="space-y-4">
                    <Input placeholder="Name" className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-400" />
                    <Input type="email" placeholder="Email" className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-400" />
                    <Textarea placeholder="Message" className="bg-black/50 border-[#9945ff]/20 text-white placeholder-gray-400" />
                    <Button className="w-full bg-gradient-to-r from-[#14f195] to-[#9945ff] hover:from-[#9945ff] hover:to-[#14f195] text-black font-bold">Send Message</Button>
                  </form>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#9945ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@sol7audit.com
                  </p>
                  <p className="flex items-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#9945ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    San Francisco, CA
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-[#14f195] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#14f195] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#14f195] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
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
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#14f195]"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-xl font-bold text-white">sol7audit</span>
              </Link>
              <p className="text-sm">AI-Powered Solana Smart Contract Auditing</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Home</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Services</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Smart Contract Audits</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Security Assessments</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Code Reviews</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Vulnerability Scanning</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#14f195] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#14f195]/10 mt-8 pt-8 text-sm text-center">
            © {new Date().getFullYear()} sol7audit.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}