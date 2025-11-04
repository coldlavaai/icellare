'use client'

// import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const teamMembers = [
  {
    name: "Supachai Ekwattanakit",
    qualification: "Thai Board of Adult Hematology",
    image: "/images/team-1.jpg"
  },
  {
    name: "Sompoj Jaturanratsamee",
    title: "M.D.",
    specialty: "Hematology",
    image: "/images/team-2.jpg"
  },
  {
    name: "Warut Tulalamba",
    title: "Ph.D Researcher",
    specialty: "Viral Vector Engineering and Gene Therapy",
    image: "/images/team-3.jpg"
  },
  {
    name: "Thanabhudee Chumnarnsongkrah",
    specialty: "Urology",
    image: "/images/team-4.jpg"
  },
  {
    name: "Talerngkiat Jamulidrad",
    title: "M.D.",
    specialty: "Body Interventionist Radiologist",
    image: "/images/team-5.jpg"
  },
  {
    name: "Phimluck Linsuwanont",
    title: "M.D.",
    specialty: "Cosmetic Dermatology and Surgery / Aesthetic Medicine",
    image: "/images/team-6.jpg"
  },
  {
    name: "Sukawit Limwananon",
    specialty: "German Board of Internal Medicine / Cardiology Subboard Intervention",
    image: "/images/team-7.jpg"
  },
  {
    name: "Jakkarin Phunphakchit",
    title: "M.D.",
    specialty: "Orthopaedics, Arthroplasty",
    image: "/images/team-8.jpg"
  },
  {
    name: "Sireewan Sukhumvat",
    title: "M.D.",
    specialty: "Cosmetic Dermatology / Aesthetic Medicine",
    image: "/images/team-9.jpg"
  }
]

function TeamMemberCard({ member, index }: { member: typeof teamMembers[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-8 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <motion.div
            className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <h3 className="font-serif text-2xl mb-3 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {member.name}
          </h3>

          {member.title && (
            <p className="text-rose-gold font-semibold mb-2">{member.title}</p>
          )}

          {member.qualification && (
            <p className="text-charcoal/80 leading-relaxed">{member.qualification}</p>
          )}

          {member.specialty && (
            <p className="text-charcoal/70 leading-relaxed text-sm">
              {member.specialty}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      {/* <DNAHelix3D /> */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-32" style={{ zIndex: 10 }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 60 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal"
          >
            Our Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            World-class specialists dedicated to your regenerative health journey
          </motion.p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="relative px-6 py-20 pb-32" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-16 md:p-24 shadow-2xl text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation with our world-class specialists to discover how we can help you achieve your best self.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
