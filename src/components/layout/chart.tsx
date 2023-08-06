import { Box } from '@chakra-ui/react'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    CartesianGrid,
} from "recharts";

interface Props {
    id: string;
    id_url: string;
    color: string;
    type: string;
    graph: {
        registered__month: number;
        count: number;
        total: number;
        registered__year: number;
    }[];
    height: string;
}

interface Data {
    registered__month: number;
    count: number;
    total: number;
    registered__year: number;
}

const MerchantsChart = ({id, id_url, color, graph, height} : Props) => {


        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        function compareData(a: Data, b: Data) {
            if (a.registered__year !== b.registered__year) {
              return a.registered__year - b.registered__year;
            }
            return a.registered__month - b.registered__month;
        }

        graph.sort(compareData);
          
          // Sort the data array
        // data.sort(compareData);

        const newData = graph.map(subarr => {
            const monthName = monthNames[subarr.registered__month - 1];
            return {registered__month: monthName, count: subarr.count, total: subarr.total, registered__year: subarr.registered__year};
        });

        // number formater
        const formatter = new Intl.NumberFormat('en-US', {
            useGrouping: true,
            minimumFractionDigits: 0
    });
        
    return (
        <Box h={height} marginLeft="-30px">
            {/* chart */}
            <ResponsiveContainer width="100%" height='100%'>
                <AreaChart data={newData}>
                <defs>
                    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="50%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
        
                <Area type="monotone" dataKey="count" stroke={color} fill={id_url}/>
        
                <XAxis
                    dataKey="registered__month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }} 
                />
        
                <YAxis
                    dataKey='count'
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => {return formatter.format(number)}}
                    tick={{ fontSize: 10 }}
                />
        
                <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default MerchantsChart
