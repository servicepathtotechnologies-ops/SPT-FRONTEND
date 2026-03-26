'use client';
import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "The Click to Sell app turned out exactly how I imagined it. SPT understood the local marketplace concept right from the first call. The location-based features and in-app chat work flawlessly. Really happy with how it came out.",
    name: "Vivek Parmar",
    role: "Founder",
    company: "Click to Sell",
    initials: "VP",
    project: "Click to Sell App",
  },
  {
    id: 2,
    quote: "BuildMart was a complex idea — connecting contractors with nearby material shops is not simple to build. SPT handled it really well. The radius-based discovery and order flow work exactly as we needed.",
    name: "Samip Mathani",
    role: "Founder",
    company: "BuildMart",
    initials: "SM",
    project: "BuildMart App",
  },
  {
    id: 3,
    quote: "SPT built our entire IONORA website from scratch. The design is bold, the animations are smooth, and it reflects exactly the identity we wanted. We get compliments on the site regularly from our own clients.",
    name: "Suresh Reddy",
    role: "Director",
    company: "IONORA",
    initials: "SR",
    project: "IONORA Portfolio Website",
  },
  {
    id: 4,
    quote: "Our real estate platform needed to handle property listings, lead capture, and an agent portal all in one. SPT delivered everything cleanly and on time. The enquiry flow alone has brought us more leads than our old site ever did.",
    name: "U Ajay",
    role: "Owner",
    company: "PrimeNest Realty",
    initials: "UA",
    project: "PrimeNest Realty Platform",
  },
  {
    id: 5,
    quote: "Simple, clean, and functional — exactly what I asked for. The hotel booking platform handles room listings and reservations smoothly. Guests find it easy to use and I can manage everything without hassle.",
    name: "V Jithu",
    role: "Hotel Owner",
    company: "Hotel Booking Platform",
    initials: "VJ",
    project: "Hotel Room Booking Platform",
  },
  {
    id: 6,
    quote: "The CRM dashboard SPT built has completely changed how our sales team operates. Pipeline tracking, lead management, and the CSV export save us hours every week. It is built exactly around how we actually work.",
    name: "Pavan O",
    role: "Sales Manager",
    company: "CRM Dashboard",
    initials: "PO",
    project: "CRM Sales Dashboard",
  },
  {
    id: 7,
    quote: "VideoTutor AI came out better than I expected. Users can paste any YouTube link and instantly get summaries and an AI tutor. The response quality is excellent and the interface is very clean. Great execution by the SPT team.",
    name: "V Shiva Kumar",
    role: "Founder",
    company: "VideoTutor AI",
    initials: "SK",
    project: "YouTube AI Platform",
  },
];

// Single row of all 7 testimonials
const rowDoubled = [...testimonials, ...testimonials];

// Give each avatar a unique color based on ID
function getAvatarColor(id: number): string {
  const colors = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)', // indigo-violet
    'linear-gradient(135deg, #f97316, #ea580c)', // orange
    'linear-gradient(135deg, #0ea5e9, #2563eb)', // sky-blue
    'linear-gradient(135deg, #10b981, #059669)', // emerald
    'linear-gradient(135deg, #f59e0b, #d97706)', // amber
    'linear-gradient(135deg, #ec4899, #db2777)', // pink
    'linear-gradient(135deg, #8b5cf6, #7c3aed)', // purple
  ];
  return colors[(id - 1) % colors.length];
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div 
      className="w-80 flex-shrink-0 flex flex-col gap-4 p-5 rounded-2xl 
                 bg-card border border-border
                 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-300 cursor-default"
    >
      {/* Project tag — top */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest 
                         text-primary bg-primary/10 border border-primary/20 
                         px-2.5 py-1 rounded-full">
          {testimonial.project}
        </span>
      </div>

      {/* Quote text — the heart of the card */}
      <p className="text-sm text-foreground leading-relaxed flex-1">
        "{testimonial.quote}"
      </p>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar with initials */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center 
                     text-white text-xs font-bold flex-shrink-0 shadow-sm"
          style={{ background: getAvatarColor(testimonial.id) }}
        >
          {testimonial.initials}
        </div>
        
        {/* Name + role */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                          text-primary text-xs font-semibold uppercase tracking-widest
                          px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Client Reviews
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients{' '}
            <span className="text-primary">Say</span>
          </h2>

          {/* Subheading */}
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real feedback from real projects — from mobile apps to 
            AI platforms and web experiences.
          </p>
          
          {/* Stats row below heading */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { number: '7+', label: 'Projects Delivered' },
              { number: '100%', label: 'Client Satisfaction' },
              { number: '5+', label: 'Industries Served' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Single Marquee row — full width, outside the max-w container */}
      <div className="mt-8">
        <div className="marquee-wrapper overflow-hidden relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none
                          bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none
                          bg-gradient-to-l from-background to-transparent" />
          
          <div className="marquee-left gap-6 flex">
            {rowDoubled.map((testimonial, i) => (
              <TestimonialCard key={`${i}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
