import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const generatePriceData = () => {
  const data = [];
  let price = 42000;
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.48) * 1000;
    data.push({
      time: `${i}m`,
      price: Math.round(price),
      volume: Math.round(Math.random() * 10000),
    });
  }
  return data;
};

const strategies = [
  { id: 1, name: 'Scalping BTC/USDT', status: 'active', profit: 12.45, trades: 127, winRate: 68 },
  { id: 2, name: 'Trend ETH/USDT', status: 'active', profit: 8.23, trades: 45, winRate: 73 },
  { id: 3, name: 'Grid SOL/USDT', status: 'paused', profit: -2.1, trades: 89, winRate: 54 },
  { id: 4, name: 'DCA Portfolio', status: 'active', profit: 15.67, trades: 12, winRate: 92 },
];

const positions = [
  { pair: 'BTC/USDT', side: 'long', entry: 42150, current: 43280, size: 0.5, pnl: 565, pnlPercent: 2.68 },
  { pair: 'ETH/USDT', side: 'long', entry: 2250, current: 2310, size: 5, pnl: 300, pnlPercent: 2.67 },
  { pair: 'SOL/USDT', side: 'short', entry: 105.5, current: 103.2, size: 50, pnl: 115, pnlPercent: 2.18 },
];

const marketData = [
  { symbol: 'BTC/USDT', price: 43280.45, change: 2.34, volume: '2.4B' },
  { symbol: 'ETH/USDT', price: 2310.12, change: 3.21, volume: '1.2B' },
  { symbol: 'SOL/USDT', price: 103.25, change: -1.45, volume: '456M' },
  { symbol: 'BNB/USDT', price: 312.67, change: 1.89, volume: '234M' },
];

const performanceData = [
  { month: 'Янв', profit: 4.2, trades: 45 },
  { month: 'Фев', profit: 6.8, trades: 52 },
  { month: 'Мар', profit: -1.5, trades: 38 },
  { month: 'Апр', profit: 8.9, trades: 61 },
  { month: 'Май', profit: 12.3, trades: 73 },
  { month: 'Июн', profit: 9.7, trades: 58 },
];

export default function Index() {
  const [priceData, setPriceData] = useState(generatePriceData());
  const [currentPrice, setCurrentPrice] = useState(43280.45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => prev + (Math.random() - 0.5) * 50);
      setPriceData((prev) => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.48) * 1000;
        newData.push({
          time: `${Date.now()}`,
          price: Math.round(newPrice),
          volume: Math.round(Math.random() * 10000),
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="TrendingUp" size={28} className="text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">CryptoTrade Pro</h1>
            <p className="text-sm text-muted-foreground">Системная торговля и аналитика</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Баланс портфеля</p>
            <p className="text-2xl font-bold font-mono">$124,567.89</p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Icon name="Plus" size={20} className="mr-2" />
            Новая стратегия
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Общая прибыль</CardTitle>
            <Icon name="TrendingUp" size={18} className="text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-secondary">+$24,567</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-secondary">+18.9%</span> за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активных позиций</CardTitle>
            <Icon name="Target" size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{positions.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-primary">+{positions.reduce((sum, p) => sum + p.pnl, 0).toFixed(0)}$</span> нереализованная прибыль
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Icon name="Award" size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">68.3%</div>
            <p className="text-xs text-muted-foreground mt-2">342 успешных сделок</p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активных стратегий</CardTitle>
            <Icon name="Zap" size={18} className="text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">
              {strategies.filter((s) => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">из {strategies.length} всего</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-panel lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">BTC/USDT</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-3xl font-bold font-mono">${currentPrice.toFixed(2)}</span>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    +2.34%
                  </Badge>
                  <span className="text-xs text-muted-foreground animate-pulse-glow">
                    <Icon name="Activity" size={12} className="inline mr-1" />
                    Live
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  1H
                </Button>
                <Button variant="outline" size="sm">
                  4H
                </Button>
                <Button variant="outline" size="sm" className="bg-primary/20 border-primary text-primary">
                  1D
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Рыночный обзор
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketData.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-semibold">{item.symbol}</p>
                  <p className="text-xs text-muted-foreground">{item.volume}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold">${item.price.toLocaleString()}</p>
                  <p className={`text-xs ${item.change > 0 ? 'text-secondary' : 'text-destructive'}`}>
                    {item.change > 0 ? '+' : ''}
                    {item.change}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="glass-panel p-1">
          <TabsTrigger value="strategies" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Icon name="Zap" size={16} className="mr-2" />
            Стратегии
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Icon name="Target" size={16} className="mr-2" />
            Позиции
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Icon name="LineChart" size={16} className="mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-4">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="glass-panel hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{strategy.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge
                          className={
                            strategy.status === 'active'
                              ? 'bg-secondary/20 text-secondary border-secondary/50'
                              : 'bg-muted text-muted-foreground'
                          }
                        >
                          <Icon name={strategy.status === 'active' ? 'Play' : 'Pause'} size={12} className="mr-1" />
                          {strategy.status === 'active' ? 'Активна' : 'Пауза'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{strategy.trades} сделок</span>
                        <span className="text-sm text-muted-foreground">Win Rate: {strategy.winRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Прибыль</p>
                    <p
                      className={`text-2xl font-bold font-mono ${
                        strategy.profit > 0 ? 'text-secondary' : 'text-destructive'
                      }`}
                    >
                      {strategy.profit > 0 ? '+' : ''}
                      {strategy.profit}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          {positions.map((position, idx) => (
            <Card key={idx} className="glass-panel">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge
                      className={
                        position.side === 'long'
                          ? 'bg-secondary/20 text-secondary border-secondary/50'
                          : 'bg-destructive/20 text-destructive border-destructive/50'
                      }
                    >
                      {position.side === 'long' ? 'LONG' : 'SHORT'}
                    </Badge>
                    <div>
                      <h3 className="text-lg font-semibold">{position.pair}</h3>
                      <p className="text-sm text-muted-foreground">
                        Размер: {position.size} | Вход: ${position.entry}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Текущая цена</p>
                    <p className="text-xl font-mono font-semibold">${position.current}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">P&L</p>
                    <p className={`text-2xl font-bold font-mono ${position.pnl > 0 ? 'text-secondary' : 'text-destructive'}`}>
                      {position.pnl > 0 ? '+' : ''}${position.pnl}
                    </p>
                    <p className={`text-sm ${position.pnl > 0 ? 'text-secondary' : 'text-destructive'}`}>
                      {position.pnl > 0 ? '+' : ''}
                      {position.pnlPercent}%
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/20">
                    <Icon name="X" size={16} className="mr-2" />
                    Закрыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Прибыль по месяцам</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="profit" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Количество сделок</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line type="monotone" dataKey="trades" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}