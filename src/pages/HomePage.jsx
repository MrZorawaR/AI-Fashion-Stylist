import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Stars, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#FCE4EC] py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#D81B60]">
                Discover Your Perfect Style with AI
              </h1>
              <p className="max-w-[600px] text-neutral-700 md:text-xl">
                Our AI analyzes your body type and recommends the perfect outfits just for you. Get personalized fashion advice in seconds.
              </p>
              <div className="space-x-4">
                <Link to="/analysis">
                  <Button className="bg-[#D81B60] text-white hover:bg-[#AD1457] transition-transform hover:scale-105">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                <Button variant="outline" className="border-[#D81B60] text-[#D81B60] hover:bg-[#FCE4EC]">
                  Learn More
                </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 animate-scale-in">
              <img
                alt="Fashion recommendations"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover hover:scale-105 transition-transform"
                height="310"
                src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 container px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-[#D81B60] mb-4">How It Works</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Our AI-powered fashion stylist helps you find the perfect outfits in just three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[Camera, Stars, ShoppingBag].map((Icon, index) => (
            <Card
              key={index}
              className={`bg-white shadow-md hover:shadow-lg transition-shadow animate-fade-in-up ${index === 1 ? 'delay-200' : index === 2 ? 'delay-400' : ''}`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-[#FCE4EC] p-4 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-[#D81B60]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#D81B60]">
                  {index === 0 ? '1. Capture Your Look' : index === 1 ? '2. AI Analysis' : '3. Get Recommendations'}
                </h3>
                <p className="text-neutral-600">
                  {index === 0
                    ? 'Use your camera to let our AI analyze your body type and proportions.'
                    : index === 1
                    ? 'Our advanced AI identifies your body shape and determines what styles will flatter you most.'
                    : 'Receive personalized outfit recommendations with direct links to purchase options.'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-[#FCE4EC] py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-[#D81B60]">Style Confidence for Everyone</h2>
              <p className="text-neutral-700">
                No more confusion about what to wear. Our AI-powered recommendations are tailored specifically to your body type, helping you dress confidently every day.
              </p>
              <ul className="space-y-2">
                {[
                  'Personalized recommendations',
                  'Outfits for every occasion',
                  'Shopping links for easy purchasing'
                ].map((text, i) => (
                  <li className="flex items-center" key={i}>
                    <div className="rounded-full bg-[#D81B60] p-1 mr-2">
                      <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/analysis">
                <Button className="bg-[#D81B60] text-white hover:bg-[#AD1457] transition-transform hover:scale-105 mt-5">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mx-auto lg:mr-0 grid grid-cols-2 gap-4 animate-scale-in">
              {[
                'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              ].map((src, i) => (
                <img
                  key={i}
                  alt="Fashion model"
                  className={`aspect-[4/5] overflow-hidden rounded-xl object-cover transition-transform hover:scale-105 ${i === 1 ? 'mt-8' : ''}`}
                  height="280"
                  src={src}
                  width="220"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-[#D81B60] mb-12 animate-fade-in-up">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: 'This app completely transformed my shopping experience. The recommendations are spot-on!',
              author: 'Sarah K.',
              avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            {
              quote: 'As someone who struggles with fashion choices, this AI stylist has been a game-changer.',
              author: 'Michael T.',
              avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            {
              quote: "I've received so many compliments since I started using the outfit recommendations!",
              author: 'Jennifer L.',
              avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
          ].map((testimonial, i) => (
            <Card key={i} className={`bg-white shadow-md hover:shadow-lg transition-shadow animate-fade-in-up ${i === 1 ? 'delay-200' : i === 2 ? 'delay-400' : ''}`}>
              <CardContent className="p-6">
                <p className="text-neutral-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    alt={testimonial.author}
                    className="rounded-full h-10 w-10 object-cover mr-4"
                    src={testimonial.avatar}
                  />
                  <span className="font-medium text-[#D81B60]">{testimonial.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FCE4EC] py-16">
        <div className="container px-4 md:px-6 text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-[#D81B60] mb-4">Ready to Elevate Your Style?</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto mb-8">
            Get personalized fashion recommendations based on your unique body type. It's free, fast, and fashion-forward.
          </p>
          <Link to="/analysis">
            <Button size="lg" className="bg-[#D81B60] text-white hover:bg-[#AD1457] transition-transform hover:scale-105">
              Analyze My Style Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
