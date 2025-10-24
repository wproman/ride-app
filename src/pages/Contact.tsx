// import React, { useState } from 'react';

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulate form submission
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Get In Touch
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Have questions or need support? We're here to help. Reach out to us and we'll get back to you as soon as possible.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white rounded-2xl p-8 shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="Enter your email address"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
//                   Subject *
//                 </label>
//                 <select
//                   id="subject"
//                   name="subject"
//                   required
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 >
//                   <option value="">Select a subject</option>
//                   <option value="general">General Inquiry</option>
//                   <option value="support">Technical Support</option>
//                   <option value="billing">Billing Issue</option>
//                   <option value="partnership">Partnership</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   required
//                   rows={6}
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="Tell us how we can help you..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-2xl p-8 shadow-lg">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-blue-100 p-3 rounded-lg">
//                     <span className="text-blue-600">📧</span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Email</h3>
//                     <p className="text-gray-600">support@rideshare.com</p>
//                     <p className="text-gray-600">business@rideshare.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="bg-green-100 p-3 rounded-lg">
//                     <span className="text-green-600">📞</span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Phone</h3>
//                     <p className="text-gray-600">+1 (555) 123-4567 (Support)</p>
//                     <p className="text-gray-600">+1 (555) 987-6543 (Business)</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="bg-purple-100 p-3 rounded-lg">
//                     <span className="text-purple-600">🏢</span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Office</h3>
//                     <p className="text-gray-600">123 Tech Street</p>
//                     <p className="text-gray-600">San Francisco, CA 94107</p>
//                     <p className="text-gray-600">United States</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="bg-yellow-100 p-3 rounded-lg">
//                     <span className="text-yellow-600">🕒</span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Business Hours</h3>
//                     <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
//                     <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
//                     <p className="text-gray-600">Sunday: Closed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* FAQ Preview */}
//             <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
//               <h3 className="text-xl font-bold mb-4">Quick Help</h3>
//               <p className="mb-4 text-blue-100">
//                 Check our FAQ section for quick answers to common questions.
//               </p>
//               <a 
//                 href="/faq" 
//                 className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//               >
//                 Visit FAQ
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Clock, HelpCircle, Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      items: ['support@rideshare.com', 'business@rideshare.com'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Phone,
      title: 'Phone',
      items: ['+1 (555) 123-4567 (Support)', '+1 (555) 987-6543 (Business)'],
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: MapPin,
      title: 'Office',
      items: ['123 Tech Street', 'San Francisco, CA 94107', 'United States'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      items: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed'
      ],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions or need support? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach out to our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${info.bgColor}`}>
                      <info.icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                      {info.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-muted-foreground">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Preview */}
            <Card className="bg-gradient-to-r from-primary to-purple-600 border-0">
              <CardContent className="p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Quick Help</h3>
                    <p className="text-white/80 mb-4">
                      Check our FAQ section for quick answers to common questions.
                    </p>
                    <Button 
                      variant="secondary" 
                      className="bg-white text-primary hover:bg-white/90"
                      asChild
                    >
                      <a href="/faq">
                        Visit FAQ
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;