
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
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeSeriesChartProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const TimeSeriesChart = ({ startDate, endDate }: TimeSeriesChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("price");
  
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    
    // Reset data and show loading state
    setLoading(true);
    setData([]);
    
    // Simulate API fetch
    const fetchData = async () => {
      // Generate random data based on date range
      const days = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const newData = [];
      
      let price = 150 + Math.random() * 50;
      let volume = 5000 + Math.random() * 5000;
      
      for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        // Random price movement (with some trend)
        const priceChange = (Math.random() - 0.48) * 5;
        price += priceChange;
        
        // Random volume
        const volumeChange = (Math.random() - 0.5) * 1000;
        volume = Math.max(1000, volume + volumeChange);
        
        // Calculate indicators
        const ma5 = i >= 4 ? 
          newData.slice(i-4, i).reduce((sum, d) => sum + d.price, 0) / 5 + price / 5 : 
          null;
          
        const ma20 = i >= 19 ? 
          newData.slice(i-19, i).reduce((sum, d) => sum + d.price, 0) / 20 + price / 20 : 
          null;
        
        newData.push({
          date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: parseFloat(price.toFixed(2)),
          volume: Math.round(volume),
          ma5: ma5 ? parseFloat(ma5.toFixed(2)) : null,
          ma20: ma20 ? parseFloat(ma20.toFixed(2)) : null,
        });
      }
      
      // Simulate network delay
      setTimeout(() => {
        setData(newData);
        setLoading(false);
      }, 1500);
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
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold mb-2">Time Series Analysis</h3>
        <p className="text-sm text-gray-600">
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="price">Price Analysis</TabsTrigger>
            <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
            <TabsTrigger value="indicators">Technical Indicators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="h-[400px]">
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
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
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
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }} 
                    activeDot={{ strokeWidth: 0, r: 6, fill: "#3b82f6" }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Price"
                  />
                </LineChart>
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
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
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
                    dataKey="volume" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }} 
                    activeDot={{ strokeWidth: 0, r: 6, fill: "#8b5cf6" }} 
                    isAnimationActive={true} 
                    animationDuration={1500}
                    name="Volume"
                  />
                </LineChart>
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
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10} 
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
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
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-6 border-t">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl font-semibold">σ</span>
            </div>
            <div>
              <h4 className="font-medium">Statistical Analysis</h4>
              <p className="text-sm text-gray-600">Standard deviation and variance metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-lg font-semibold">ML</span>
            </div>
            <div>
              <h4 className="font-medium">Machine Learning</h4>
              <p className="text-sm text-gray-600">Predictive algorithms for trend forecasting</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeSeriesChart;
