
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/DatePicker";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import { toast } from "@/components/ui/use-toast";

const Analysis = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  
  const handleAnalysis = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date range required",
        description: "Please select both start and end dates to run the analysis.",
        variant: "destructive",
      });
      return;
    }
    
    if (startDate >= endDate) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }
    
    // Limit analysis to 90 days max for demo
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 90) {
      toast({
        title: "Date range too large",
        description: "For this demo, please select a date range of 90 days or less.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalysisStarted(true);
    toast({
      title: "Analysis started",
      description: "Processing data for the selected time range.",
    });
  };
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-lg font-medium">AlgoTrade</span>
          </div>
        </div>
        
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Financial Time Series Analysis
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-3xl"
            variants={itemVariants}
          >
            Select a date range to analyze historical data and generate insights using advanced time series algorithms.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div 
            className="md:col-span-1 bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Cpu className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Analysis Parameters</h2>
            </div>
            
            <div className="space-y-6">
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                label="Start Date"
              />
              
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                label="End Date"
              />
              
              <Button
                onClick={handleAnalysis}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
                disabled={!startDate || !endDate}
              >
                Run Analysis
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">Analysis Options</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Price trend analysis</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Moving averages</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Volume analysis</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                  <span>Volatility metrics</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {analysisStarted ? (
              <TimeSeriesChart startDate={startDate} endDate={endDate} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <LineChartIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ready to Analyze</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Select a date range and click "Run Analysis" to generate insights from historical data.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Algorithms</p>
                    <p className="text-sm text-gray-600">ARIMA, GARCH, ML</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Data Points</p>
                    <p className="text-sm text-gray-600">High frequency</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {analysisStarted && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2">Mean Reversion</h3>
              <p className="text-sm text-gray-600 mb-4">Statistical tendency for prices to revert to mean</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-right text-sm mt-1">65% confidence</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2">Momentum</h3>
              <p className="text-sm text-gray-600 mb-4">Continuation of existing price trends</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <p className="text-right text-sm mt-1">72% confidence</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2">Seasonality</h3>
              <p className="text-sm text-gray-600 mb-4">Cyclical patterns in time series data</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
              </div>
              <p className="text-right text-sm mt-1">33% confidence</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2">Volatility</h3>
              <p className="text-sm text-gray-600 mb-4">Dispersion of returns for the asset</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '58%' }}></div>
              </div>
              <p className="text-right text-sm mt-1">58% confidence</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Helper icon component
const LineChartIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

export default Analysis;
