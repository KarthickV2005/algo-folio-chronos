
import { motion } from "framer-motion";
import { Cpu, BarChart3, Zap, TrendingUp, Clock, PieChart } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Comprehensive analysis tools to track market trends and predict future movements.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Machine Learning Algorithms",
    description: "Our algorithms learn and adapt to market changes to improve prediction accuracy.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-Time Processing",
    description: "Process market data in real-time to identify trading opportunities as they emerge.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Predictive Modeling",
    description: "Build and test trading models with historical data to optimize future performance.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Backtesting Engine",
    description: "Test your strategies against historical data to validate performance.",
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Risk Management",
    description: "Advanced tools to monitor and manage trading risks across your portfolio.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4"
            variants={itemVariants}
          >
            Features
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Advanced Trading Tools
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our platform provides sophisticated tools for algorithmic trading,
            helping you make data-driven decisions with confidence.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover-scale"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
