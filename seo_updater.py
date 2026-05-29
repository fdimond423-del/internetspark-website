import os
import re

base_dir = r"C:\Users\FENIL LIMBACHIYA\.gemini\antigravity\scratch\internet-spark"

def update_file(filename, replacements, faq_addition=None, faq_target=None):
    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old not in content:
            print(f"Warning: String not found in {filename}:\n{old[:50]}...")
        content = content.replace(old, new)
        
    if faq_addition and faq_target:
        if faq_target not in content:
            print(f"Warning: FAQ target not found in {filename}")
        # Insert faq_addition before faq_target
        content = content.replace(faq_target, faq_addition + "\n  " + faq_target)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# File 1: services.html
services_reps = [
    ('<meta name="description" content="Internet Spark Services — Complete digital marketing solutions: Social Media, SEO, Google Ads, Meta Ads, Website Development, Video, AI, Lead Generation and more.">',
     '<meta name="description" content="Internet Spark Services — Ahmedabad\'s complete digital marketing solutions: Social Media, SEO, Google Ads, Meta Ads, Website Development, Video, AI, Lead Generation. Serving SG Highway, Prahlad Nagar & beyond.">'),
    ('<title>Our Services | Internet Spark - Digital Marketing Agency</title>',
     '<title>Our Services | Best Digital Marketing Agency in Ahmedabad | Internet Spark</title>'),
    ('<h1>Complete <span class="text-gradient">Digital Marketing</span> Solutions</h1>',
     '<h1>Ahmedabad\'s Complete <span class="text-gradient">Digital Marketing</span> Solutions</h1>'),
    ('<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">From strategy to execution, we offer end-to-end digital marketing services that drive real business growth. Explore our 20+ specialized services designed to help your brand dominate online.</p>',
     '<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">From strategy to execution, we offer end-to-end <a href="../services/seo.html" style="color:var(--primary-light);text-decoration:none;">SEO</a> and digital marketing services that drive real business growth for brands in Ahmedabad and across India. Explore our 20+ specialized services designed to help your business dominate online.</p>'),
    ('<h2>Everything You Need to <span class="text-gradient">Win Online</span></h2>',
     '<h2>Everything You Need to <span class="text-gradient">Win Online in Ahmedabad</span></h2>'),
    ('<div class="card-desc">Rank #1 on Google with comprehensive SEO including technical audit, on-page optimization, content strategy, and authoritative link building.</div>',
     '<div class="card-desc">Rank #1 on Google with comprehensive <a href="../services/seo.html" style="color:var(--primary-light);">SEO services</a> including technical audit, local SEO for Ahmedabad, content strategy, and link building.</div>')
]

services_faq = """
  <!-- AEO FAQ Section -->
  <section class="section-padding" style="background:rgba(255,255,255,0.02);border-top:1px solid var(--glass-border);">
    <div class="container">
      <div class="section-header reveal"><div class="section-badge"><i class="fas fa-question-circle"></i> Local FAQ</div><h2><span class="text-gradient">Ahmedabad Voice Search</span> FAQ</h2></div>
      <div style="max-width:800px;margin:0 auto">
        <div class="faq-item"><div class="faq-question">What is the best digital marketing agency in Ahmedabad?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Internet Spark is widely recognized as Ahmedabad's top digital marketing agency. We specialize in high-ROI campaigns, advanced SEO, and lead generation for businesses in areas like Makarba, SG Highway, and Prahlad Nagar.</div></div></div>
        <div class="faq-item"><div class="faq-question">Where can I find top SEO services near SG Highway?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Located at KP Epitome in Makarba, Internet Spark offers the best local and national <a href="../services/seo.html" style="color:var(--primary-light);">SEO services</a> near SG Highway to boost your organic traffic.</div></div></div>
        <div class="faq-item"><div class="faq-question">Which company offers the best website development in Ahmedabad?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Internet Spark provides top-rated, mobile-first, and SEO-ready website development services in Ahmedabad, ensuring your site is engineered to convert visitors into loyal customers.</div></div></div>
      </div>
    </div>
  </section>"""

# File 2: portfolio.html
portfolio_reps = [
    ('<meta name="description" content="Internet Spark Portfolio — 1000+ successful digital marketing projects. See our work in social media, web design, branding, ads and more.">',
     '<meta name="description" content="Internet Spark Portfolio — 1000+ successful digital marketing projects in Ahmedabad. See our top-tier work in social media, web design, branding, SEO and more.">'),
    ('<title>Portfolio | Internet Spark - Digital Marketing Agency</title>',
     '<title>Portfolio | Top Digital Marketing Agency in Ahmedabad | Internet Spark</title>'),
    ('<h1>Portfolio — Work That <span class="text-gradient">Speaks for Itself</span></h1>',
     '<h1>Portfolio — Ahmedabad Campaigns That <span class="text-gradient">Speak for Themselves</span></h1>'),
    ('<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">1000+ successful projects delivered across 20+ industries. Real campaigns. Real results. Real impact.</p>',
     '<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">1000+ successful projects delivered for top businesses in Ahmedabad and across 20+ industries. Real <a href="../services/seo.html" style="color:var(--primary-light);">SEO</a> campaigns. Real results. Real impact.</p>'),
]

portfolio_faq = """
  <!-- AEO FAQ Section -->
  <section class="section-padding" style="background:rgba(255,255,255,0.02);border-top:1px solid var(--glass-border);">
    <div class="container">
      <div class="section-header reveal"><div class="section-badge"><i class="fas fa-question-circle"></i> FAQ</div><h2><span class="text-gradient">Ahmedabad Portfolio</span> FAQ</h2></div>
      <div style="max-width:800px;margin:0 auto">
        <div class="faq-item"><div class="faq-question">What are some successful marketing campaigns in Ahmedabad?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">We have driven massive success for local brands, including premium housing projects and jewelry stores across Ahmedabad, achieving up to 5X ROAS using targeted Meta Ads and <a href="../services/seo.html" style="color:var(--primary-light);">SEO strategies</a>.</div></div></div>
        <div class="faq-item"><div class="faq-question">How does Internet Spark help local Ahmedabad businesses?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">From interior designers in Prahlad Nagar to automobile dealers on SG Highway, we utilize hyper-local SEO, GMB optimization, and high-converting websites to dominate the local market.</div></div></div>
      </div>
    </div>
  </section>"""

# File 3: pricing.html
pricing_reps = [
    ('<meta name="description" content="Internet Spark Pricing — Transparent digital marketing packages starting from ₹15,000/month. No hidden costs. 30-day money-back guarantee.">',
     '<meta name="description" content="Internet Spark Pricing — Transparent digital marketing packages in Ahmedabad starting from ₹15,000/month. No hidden costs. Serving SG Highway & Makarba.">'),
    ('<title>Pricing | Internet Spark - Digital Marketing Packages</title>',
     '<title>Pricing | Digital Marketing Packages in Ahmedabad | Internet Spark</title>'),
    ('<h1>Simple, <span class="text-gradient">Transparent Pricing</span></h1>',
     '<h1>Simple, <span class="text-gradient">Transparent Pricing in Ahmedabad</span></h1>'),
    ('<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">No hidden costs. No long-term contracts. Just results-focused digital marketing at the right investment level for your business. All plans include a free strategy session.</p>',
     '<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">No hidden costs. No long-term contracts. Just results-focused digital marketing and <a href="../services/seo.html" style="color:var(--primary-light);">SEO</a> at the right investment level for your Ahmedabad business. All plans include a free local strategy session.</p>'),
    ('<h2>Pricing <span class="text-gradient">Questions Answered</span></h2>',
     '<h2>Ahmedabad Pricing <span class="text-gradient">Questions Answered</span></h2>'),
    ('<div class="faq-answer-inner">Absolutely. From local shops to large enterprises, we have packages starting from ₹15,000/month. Our Starter plan is designed for small businesses just beginning digital marketing, while our Enterprise plan supports large-scale operations.</div>',
     '<div class="faq-answer-inner">Absolutely. From local shops in Makarba and SG Highway to large enterprises across Ahmedabad, we have packages starting from ₹15,000/month. Our Starter plan is designed for small businesses just beginning digital marketing, while our Enterprise plan supports large-scale operations.</div>'),
    ('<div class="faq-item"><div class="faq-question">Do you provide a custom quote for enterprise businesses?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Yes. For businesses with complex requirements, high ad budgets, or multiple locations/brands, we create completely custom proposals. Call us at +91 93137 02720 or email yashworkonly16@gmail.com for an enterprise consultation.</div></div></div>',
     '<div class="faq-item"><div class="faq-question">Do you provide a custom quote for enterprise businesses?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Yes. For businesses with complex requirements, high ad budgets, or multiple locations/brands, we create completely custom proposals. Call us at +91 93137 02720 or email yashworkonly16@gmail.com for an enterprise consultation.</div></div></div>\n        <div class="faq-item"><div class="faq-question">What is the cost of SEO services in Ahmedabad?<div class="faq-icon"><i class="fas fa-plus"></i></div></div><div class="faq-answer"><div class="faq-answer-inner">Our comprehensive <a href="../services/seo.html" style="color:var(--primary-light);">SEO services in Ahmedabad</a> start within our Growth package at ₹35,000/month, ensuring you get on-page, technical, and local SEO to dominate Ahmedabad search results.</div></div></div>')
]

# File 4: testimonials.html
testimonials_reps = [
    ('<meta name="description" content="Internet Spark Testimonials — Read what 500+ happy clients say about our digital marketing services. 4.9/5 rating on Google.">',
     '<meta name="description" content="Internet Spark Testimonials — Read what 500+ happy clients in Ahmedabad and beyond say about our digital marketing services. Top-rated agency on SG Highway.">'),
    ('<title>Testimonials | Internet Spark - Client Reviews</title>',
     '<title>Testimonials | Top Digital Marketing Agency Reviews Ahmedabad</title>'),
    ('<h1>What Our Clients <span class="text-gradient">Say About Us</span></h1>',
     '<h1>What Our Ahmedabad Clients <span class="text-gradient">Say About Us</span></h1>'),
    ('<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">500+ satisfied clients across India and globally. Real reviews. Real businesses. Real transformation.</p>',
     '<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">500+ satisfied clients in Ahmedabad, across India, and globally. Real reviews. Real businesses. Real transformation.</p>'),
]

# File 5: privacy-policy.html
privacy_reps = [
    ('<title>Privacy Policy | Internet Spark</title>',
     '<title>Privacy Policy | Internet Spark - Ahmedabad Digital Marketing</title>'),
    ('<p>Welcome to Internet Spark ("we," "our," or "us"). We are a digital marketing agency headquartered at A-407, KP Epitome, Nr. DAV International School, Makarba, Ahmedabad – 380051, Gujarat, India.</p>',
     '<p>Welcome to Internet Spark ("we," "our," or "us"). We are Ahmedabad\'s premier digital marketing agency, headquartered at A-407, KP Epitome, near SG Highway, Makarba, Ahmedabad – 380051, Gujarat, India.</p>')
]

# File 6: contact.html
contact_reps = [
    ('<meta name="description" content="Contact Internet Spark - Ahmedabad\'s #1 Digital Marketing Agency. Call +91 93137 02720 or email yashworkonly16@gmail.com. Free consultation available.">',
     '<meta name="description" content="Contact Internet Spark - Ahmedabad\'s #1 Digital Marketing Agency located at Makarba, SG Highway. Call +91 93137 02720 or email yashworkonly16@gmail.com for a free consultation.">'),
    ('<title>Contact Us | Internet Spark - Digital Marketing Agency Ahmedabad</title>',
     '<title>Contact Us | Best Digital Marketing Agency in Ahmedabad | Internet Spark</title>'),
    ('<h1>Get In <span class="text-gradient">Touch</span></h1>',
     '<h1>Get In <span class="text-gradient">Touch in Ahmedabad</span></h1>'),
    ('<p style="max-width:600px;margin:20px auto 0;font-size:1.1rem">Ready to grow your business? Reach out for a free consultation. Our team will get back to you within 24 hours.</p>',
     '<p style="max-width:600px;margin:20px auto 0;font-size:1.1rem">Ready to grow your Ahmedabad business? Reach out for a free consultation. Visit our office near SG Highway or call us today!</p>'),
    ('<div style="font-weight:700;font-size:1.1rem;margin-bottom:4px">Internet Spark Office</div>',
     '<div style="font-weight:700;font-size:1.1rem;margin-bottom:4px">Internet Spark Ahmedabad Office</div>'),
    ('<div style="color:var(--text-muted);font-size:0.875rem">A-407, KP Epitome, Makarba, Ahmedabad</div>',
     '<div style="color:var(--text-muted);font-size:0.875rem">A-407, KP Epitome, Off SG Highway, Makarba, Ahmedabad</div>')
]

update_file('services.html', services_reps, services_faq, '<section class="cta-section">')
update_file('portfolio.html', portfolio_reps, portfolio_faq, '<section class="cta-section">')
update_file('pricing.html', pricing_reps)
update_file('testimonials.html', testimonials_reps)
update_file('privacy-policy.html', privacy_reps)
update_file('contact.html', contact_reps)
print("Update complete")
