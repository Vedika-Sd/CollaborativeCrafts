import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Phone, Heart, Shield, Users, Globe, CheckCircle } from 'lucide-react';
import posterImage from 'figma:asset/c45d86430452ce1360387dc0fdb63e0e64cd6f51.png';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', phone: '', message: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#F6EDE5] text-gray-800 relative overflow-x-hidden">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23%238B1E2D' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='45' cy='15' r='1'/%3E%3Ccircle cx='15' cy='45' r='1'/%3E%3Ccircle cx='45' cy='45' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Top Header Bar */}
      <div className="bg-[#8B1E2D] text-white py-2 px-4 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-center md:text-left text-sm md:text-base font-medium">
            || श्री गणेशाय नमः || जय विरभद्र प्रसन्न || श्री धानंम्मादेवी प्रसन्न ||
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:9067050015" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm md:text-base">9067050015</span>
            </a>
            <Button variant="secondary" size="sm" className="bg-white text-[#8B1E2D] hover:bg-gray-100">
              मोफत नोंदणी
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#F6EDE5] to-[#F0E6D7]">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={posterImage} 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-[#8B1E2D] mb-4 drop-shadow-lg" style={{ fontFamily: 'serif' }}>
              लग्नघाटिका
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#8B1E2D] mb-6 font-medium">
              वधूवर सूचक
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              योग्य जोडीदार, योग्य वेळी, योग्य ठिकाणी.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-[#8B1E2D] hover:bg-[#7A1B2A] text-white px-8 py-3 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            माहिती घ्या / नोंदणी करा
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#8B1E2D] text-center mb-12">
            आमच्या सेवा
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="w-8 h-8 text-[#8B1E2D]" />,
                title: "वधू-वरांची नोंदणी सुरु",
                description: "सोप्या प्रक्रियेत नोंदणी करा"
              },
              {
                icon: <Users className="w-8 h-8 text-[#8B1E2D]" />,
                title: "जंगम समाजातील सर्व वयोगटांसाठी सेवा",
                description: "सर्व वयोगटांसाठी योग्य जोडीदार"
              },
              {
                icon: <Globe className="w-8 h-8 text-[#8B1E2D]" />,
                title: "ऑनलाइन / ऑफलाइन नोंदणी सुविधा",
                description: "आपल्या सोयीनुसार नोंदणी करा"
              },
              {
                icon: <Shield className="w-8 h-8 text-[#8B1E2D]" />,
                title: "गोपनीयता व सुरक्षिततेची हमी",
                description: "आपली माहिती पूर्ण सुरक्षित"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#8B1E2D]">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-[#8B1E2D]/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-[#8B1E2D] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#8B1E2D] to-[#A52A3A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-yellow-500 text-black mb-6 px-4 py-2 text-lg font-bold">
            मुफत नोंदणी सुरु
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            जंगम समाजासाठी खास सुवर्णसंधी
          </h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            आपल्या मुला-मुलीसाठी योग्य जोडीदार शोधण्याचे विश्वसनीय व्यासपीठ.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-[#8B1E2D] hover:bg-gray-100 px-8 py-3 text-lg rounded-xl"
          >
            आजच सुरुवात करा
          </Button>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#8B1E2D] text-center mb-12">
            आम्हाला संदेश पाठवा
          </h3>
          
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>तुमचा संदेश प्राप्त झाला!</span>
            </div>
          )}

          <Card className="p-8 shadow-xl border-2 border-[#8B1E2D]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#8B1E2D] mb-2 font-medium">
                  नाव *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="आपले पूर्ण नाव लिहा"
                  required
                  className="border-[#8B1E2D]/30 focus:border-[#8B1E2D] focus:ring-[#8B1E2D]/20"
                />
              </div>
              
              <div>
                <label className="block text-[#8B1E2D] mb-2 font-medium">
                  फोन नंबर *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="आपला फोन नंबर लिहा"
                  required
                  className="border-[#8B1E2D]/30 focus:border-[#8B1E2D] focus:ring-[#8B1E2D]/20"
                />
              </div>
              
              <div>
                <label className="block text-[#8B1E2D] mb-2 font-medium">
                  संदेश
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="आपला संदेश लिहा..."
                  rows={4}
                  className="border-[#8B1E2D]/30 focus:border-[#8B1E2D] focus:ring-[#8B1E2D]/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#8B1E2D] hover:bg-[#7A1B2A] text-white py-3 text-lg rounded-lg"
              >
                पाठवा
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B1E2D] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="tel:9067050015" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="text-lg">9067050015</span>
            </a>
            <a href="https://instagram.com/lagna_ghatika_vadhuvarsuchak_" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              📱 @lagna_ghatika_vadhuvarsuchak_
            </a>
          </div>
          <div className="border-t border-white/20 pt-4 text-sm opacity-80">
            गोपनीयता हमी • सर्व हक्क राखीव • © 2024 लग्नघाटिका
          </div>
        </div>
      </footer>

      {/* Mobile Floating Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button 
          size="lg" 
          className="bg-[#8B1E2D] hover:bg-[#7A1B2A] text-white rounded-full shadow-2xl px-6"
        >
          चौकशी करा
        </Button>
      </div>
    </div>
  );
}