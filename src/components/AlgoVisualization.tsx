
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for the visualization
const generateDummyData = () => {
  const data = [];
  let value = 100;
  
  for (let i = 0; i < 30; i++) {
    // Random walk with trend
    const change = Math.random() * 10 - 5 + (i > 15 ? 2 : -1);
    value = Math.max(50, value + change);
    
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      value: parseFloat(value.toFixed(2)),
      sma: null,
      predicted: null
    });
  }
  
  // Calculate SMA (Simple Moving Average)
  const window = 5;
  for (let i = window - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < window; j++) {
      sum += data[i - j].value;
    }
    data[i].sma = parseFloat((sum / window).toFixed(2));
  }
  
  // Add predicted values
  for (let i = 25; i < 30; i++) {
    const lastRealValue = data[24].value;
    const trend = (data[24].value - data[20].value) / 4;
    const daysSince = i - 24;
    const randomNoise = (Math.random() * 6) - 3;
    data[i].predicted = parseFloat((lastRealValue + (trend * daysSince) + randomNoise).toFixed(2));
  }
  
  return data;
};

const data = generateDummyData();

// Animation variants
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

const AlgoVisualization = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const chartRef = useRef(null);
  
  useEffect(() => {
    // This is where we could implement more sophisticated animations
    // such as progressive data rendering if needed
  }, [isInView]);

  return (
    <section ref={ref} id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4"
            variants={itemVariants}
          >
            Algorithm Visualization
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Time Series Analysis in Action
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our algorithms analyze historical patterns to predict future market movements
            with remarkable accuracy.
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
          ref={chartRef}
        >
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">Stock Performance Prediction</h3>
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Actual</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-sm text-gray-600">SMA</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Predicted</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">30-day analysis with 5-day prediction based on machine learning models</p>
          </div>
          
          <div className="h-[400px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickMargin={10} 
                />
                <YAxis 
                  domain={['dataMin - 10', 'dataMax + 10']} 
                  tick={{ fontSize: 12 }} 
                  tickMargin={10} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0.5rem', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2, r: 4 }} 
                  activeDot={{ strokeWidth: 0, r: 6, fill: "#3b82f6" }} 
                  isAnimationActive={true} 
                  animationDuration={2000}
                />
                <Line 
                  type="monotone" 
                  dataKey="sma" 
                  stroke="#9ca3af" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={true} 
                  animationDuration={2000}
                  animationBegin={500}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ strokeWidth: 2, r: 4, fill: '#22c55e' }} 
                  isAnimationActive={true} 
                  animationDuration={2000}
                  animationBegin={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          transition={{ delayChildren: 0.4 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-2">Data Analysis</h3>
            <p className="text-gray-600">Our algorithms process vast amounts of historical market data to identify patterns and correlations.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-2">Pattern Recognition</h3>
            <p className="text-gray-600">Machine learning models identify recurring patterns and trends in market behavior.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-2">Forecasting</h3>
            <p className="text-gray-600">Based on historical analysis, our algorithms generate accurate price forecasts and trading signals.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlgoVisualization;
