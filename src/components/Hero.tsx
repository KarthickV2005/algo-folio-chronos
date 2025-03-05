
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, LineChart, BarChart, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Framer motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const floatingIconVariants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  floating: {
    y: [0, -10, 0],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      
      <div className="absolute top-40 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-slow" />
      <div className="absolute top-60 right-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-20 -z-10 animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-6">
              Advanced Algorithmic Trading
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="gradient-text">Time Series Analysis</span>
            <br /> for Modern Trading
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-balance"
          >
            Leverage advanced algorithms and real-time data analysis to optimize your trading strategy with our cutting-edge platform.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-12 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/analysis">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 h-12 px-8 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Floating charts animation */}
        <motion.div 
          className="relative h-[300px] sm:h-[400px] mx-auto max-w-5xl mt-4"
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Central chart */}
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-xl p-6 shadow-xl w-[280px] sm:w-[320px] md:w-[380px] z-10"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-800">AAPL Performance</span>
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="h-32 flex items-end space-x-2">
              {[40, 25, 55, 32, 80, 45, 68, 30, 50, 65, 78, 58, 30, 90, 60, 45, 85, 65, 72].map((height, i) => (
                <div
                  key={i}
                  className="w-full bg-blue-500 rounded-sm opacity-80 hover:opacity-100 transition-all duration-200"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500">Jan</span>
              <span className="text-xs text-gray-500">Dec</span>
            </div>
          </motion.div>
          
          {/* Floating icons */}
          <motion.div 
            className="absolute left-[15%] top-[20%] glass rounded-lg p-3 shadow-lg"
            variants={floatingIconVariants}
            animate="floating"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <TrendingUp className="h-6 w-6 text-green-500" />
          </motion.div>
          
          <motion.div 
            className="absolute right-[20%] top-[15%] glass rounded-lg p-3 shadow-lg"
            variants={floatingIconVariants}
            animate="floating"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            transition={{ delay: 0.2 }}
          >
            <BarChart className="h-6 w-6 text-blue-500" />
          </motion.div>
          
          <motion.div 
            className="absolute left-[25%] bottom-[20%] glass rounded-lg p-3 shadow-lg"
            variants={floatingIconVariants}
            animate="floating"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            transition={{ delay: 0.5 }}
          >
            <PieChart className="h-6 w-6 text-purple-500" />
          </motion.div>
          
          <motion.div 
            className="absolute right-[25%] bottom-[15%] glass rounded-lg p-3 shadow-lg"
            variants={floatingIconVariants}
            animate="floating"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            transition={{ delay: 0.7 }}
          >
            <LineChart className="h-6 w-6 text-indigo-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
