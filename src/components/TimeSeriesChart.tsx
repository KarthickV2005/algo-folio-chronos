
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface TimeSeriesChartProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const TimeSeriesChart = ({ startDate, endDate }: TimeSeriesChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("price");
  const [predictionData, setPredictionData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    
    // Reset data and show loading state
    setLoading(true);
    setData([]);
    
    // Simulate API fetch that would connect to your Python backend
    const fetchData = async () => {
      try {
        // In a real implementation, this would be a fetch call to your Python backend
        // const response = await fetch('/api/timeseries', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     startDate: startDate.toISOString(),
        //     endDate: endDate.toISOString(),
        //     symbol: 'BTC-USD' // Could be made configurable
        //   }),
        // });
        // const result = await response.json();
        // setData(result.historicalData);
        // setPredictionData(result.predictions);
        
        // For demo purposes, we'll generate random data
        const days = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const newData = [];
        const newPredictionData = [];
        
        let price = 150 + Math.random() * 50;
        let volume = 5000 + Math.random() * 5000;
        let volatility = 0.02 + Math.random() * 0.03;
        
        for (let i = 0; i <= days; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          // Add some realistic market behavior with trends and volatility
          const dailyVolatility = volatility * (0.5 + Math.random());
          const trend = Math.sin(i / 10) * 0.4; // Cyclical trend component
          const priceChange = (Math.random() - 0.48 + trend) * 5 * dailyVolatility;
          price += priceChange;
          
          // Volume often increases with volatility
          const volumeMultiplier = 1 + dailyVolatility * 10;
          const volumeChange = (Math.random() - 0.5) * 1000 * volumeMultiplier;
          volume = Math.max(1000, volume + volumeChange);
          
          // Calculate technical indicators
          const ma5 = i >= 4 ? 
            newData.slice(i-4, i).reduce((sum, d) => sum + d.price, 0) / 5 + price / 5 : 
            null;
            
          const ma20 = i >= 19 ? 
            newData.slice(i-19, i).reduce((sum, d) => sum + d.price, 0) / 20 + price / 20 : 
            null;
            
          // RSI calculation (simplified)
          const rsi = 50 + Math.sin(i / 5) * 20 + (Math.random() - 0.5) * 20;
          
          newData.push({
            date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
            volume: Math.round(volume),
            volatility: parseFloat((dailyVolatility * 100).toFixed(2)),
            ma5: ma5 ? parseFloat(ma5.toFixed(2)) : null,
            ma20: ma20 ? parseFloat(ma20.toFixed(2)) : null,
            rsi: parseFloat(rsi.toFixed(2))
          });
        }
        
        // Create prediction data (extending beyond the historical data)
        let lastPrice = newData[newData.length - 1].price;
        for (let i = 1; i <= 7; i++) {
          const predictionDate = new Date(endDate);
          predictionDate.setDate(endDate.getDate() + i);
          
          // Add some uncertainty to predictions (increasing with time)
          const uncertaintyFactor = 0.01 * i;
          const predictedChange = (Math.random() - 0.48) * 5 * (1 + uncertaintyFactor);
          lastPrice += predictedChange;
          
          newPredictionData.push({
            date: predictionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            predictedPrice: parseFloat(lastPrice.toFixed(2)),
            lowerBound: parseFloat((lastPrice * (1 - uncertaintyFactor)).toFixed(2)),
            upperBound: parseFloat((lastPrice * (1 + uncertaintyFactor)).toFixed(2))
          });
        }
        
        // Simulate network delay
        setTimeout(() => {
          setData(newData);
          setPredictionData(newPredictionData);
          setLoading(false);
          toast.success("Analysis completed successfully");
        }, 1500);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [startDate, endDate]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 border-b dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Financial Time Series Analysis</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {startDate && endDate ? (
            <>
              Analyzing data from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
            </>
          ) : (
            <>Select date range to view analysis</>
          )}
        </p>
      </div>
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="h-[400px]">
            {loading ? (
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4, fill: "#3b82f6" }} 
                    activeDot={{ strokeWidth: 0, r: 6, fill: "#3b82f6" }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Price"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="volume" className="h-[400px]">
            {loading ? (
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Bar 
                    dataKey="volume" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Volume"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="indicators" className="h-[400px]">
            {loading ? (
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            ) : (
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
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }} 
                    activeDot={{ strokeWidth: 0, r: 6, fill: "#3b82f6" }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Price"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma5" 
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={500}
                    name="5-Day MA"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma20" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={1000}
                    name="20-Day MA"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsi" 
                    stroke="#ec4899" 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={1500}
                    name="RSI"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="predictions" className="h-[400px]">
            {loading ? (
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...data.slice(-14), ...predictionData]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Historical Price"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predictedPrice" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ strokeWidth: 2, r: 4, fill: "#10b981" }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={500}
                    name="Predicted Price"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="upperBound" 
                    stroke="#9ca3af" 
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={1000}
                    name="Upper Bound"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lowerBound" 
                    stroke="#9ca3af" 
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    isAnimationActive={true} 
                    animationDuration={1500}
                    animationBegin={1000}
                    name="Lower Bound"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-6 border-t dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 text-xl font-semibold">σ</span>
            </div>
            <div>
              <h4 className="font-medium dark:text-gray-100">Statistical Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standard deviation and variance metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-300 text-lg font-semibold">ML</span>
            </div>
            <div>
              <h4 className="font-medium dark:text-gray-100">Machine Learning</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Predictive algorithms for trend forecasting</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeSeriesChart;
