const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const servicesDir = path.join(rootDir, 'services');

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Internet Spark",
  "url": "https://internet-spark.com",
  "logo": "https://internet-spark.com/images/logo-final.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9313702720",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Gujarati"]
  },
  "sameAs": [
    "https://www.facebook.com/internetspark",
    "https://www.instagram.com/internetspark",
    "https://www.linkedin.com/company/internetspark"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Internet Spark - Digital Marketing Agency",
  "image": "https://internet-spark.com/images/logo-final.png",
  "@id": "https://internet-spark.com",
  "url": "https://internet-spark.com",
  "telephone": "+91-9313702720",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "A-407, KP Epitome, Makarba",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380051",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.0063,
    "longitude": 72.5020
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    "opens": "10:00",
    "closes": "19:00"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best digital marketing agency in Ahmedabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internet Spark is widely recognized as the top digital marketing agency in Ahmedabad, specializing in advanced SEO, Meta Ads, Google Ads, and Lead Generation for businesses."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my website ranking in Ahmedabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To improve your website ranking in Ahmedabad, you need localized technical SEO, high-quality content, and strong local backlinks. Internet Spark provides comprehensive SEO services to help you rank #1."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide website development services in Ahmedabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Internet Spark offers fast, mobile-friendly, and SEO-optimized website development services tailored for businesses in Ahmedabad."
      }
    }
  ]
};

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let isModified = false;

  // 1. Inject JSON-LD
  const schemas = `<script type="application/ld+json">\n${JSON.stringify(organizationSchema, null, 2)}\n</script>\n<script type="application/ld+json">\n${JSON.stringify(localBusinessSchema, null, 2)}\n</script>\n<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;
  
  if (!html.includes('application/ld+json')) {
    html = html.replace('</head>', `\n${schemas}\n</head>`);
    isModified = true;
  }

  // 2. Add Preconnects for Page Speed
  const preconnects = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  `;
  if (!html.includes('fonts.googleapis.com')) {
    html = html.replace('<head>', `<head>\n${preconnects}`);
    isModified = true;
  }

  // 3. Defer JS
  if (html.includes('<script src="js/main.js"></script>')) {
      html = html.replace('<script src="js/main.js"></script>', '<script src="js/main.js" defer></script>');
      isModified = true;
  }
  
  // 4. Lazy loading for images
  // Uses regex to find <img> without loading="lazy"
  const imgRegex = /<img(?![^>]*loading=["']lazy["'])[^>]*>/g;
  html = html.replace(imgRegex, (match) => {
      isModified = true;
      return match.replace('<img', '<img loading="lazy"');
  });

  // 5. Open Graph & Twitter Cards if not present
  if (!html.includes('twitter:card')) {
      const ogMeta = `
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Internet Spark | Digital Marketing Agency Ahmedabad">
    <meta name="twitter:description" content="Rank #1 with Ahmedabad's premium digital marketing agency. SEO, Meta Ads, Website Development.">
    <meta name="twitter:image" content="https://internet-spark.com/images/logo-final.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://internet-spark.com/">
    <meta property="og:site_name" content="Internet Spark">
      `;
      html = html.replace('</head>', `${ogMeta}\n</head>`);
      isModified = true;
  }

  if (isModified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Optimized: ${filePath}`);
  }
}

// Process Root HTML files
fs.readdirSync(rootDir).forEach(file => {
  if (file.endsWith('.html') && file !== 'temp_live.html') {
    processHtmlFile(path.join(rootDir, file));
  }
});

// Process Services HTML files
if (fs.existsSync(servicesDir)) {
  fs.readdirSync(servicesDir).forEach(file => {
    if (file.endsWith('.html')) {
      processHtmlFile(path.join(servicesDir, file));
    }
  });
}

console.log("Backend SEO Optimization complete.");
