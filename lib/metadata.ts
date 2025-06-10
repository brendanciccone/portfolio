import type { Metadata } from 'next';

// Base metadata that's common across all pages
const baseMetadata = {
  siteName: "Brendan Ciccone",
  description: "Brendan Ciccone is a 0 → 1 Staff Product Designer with 7 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.",
  baseUrl: "https://brendanciccone.com",
  defaultImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-d0SidsvzAZGPwLQFoyhGS1atLlTVa3.jpeg",
  creator: "@brendanciccone",
  locale: "en_US",
};

// Project-specific details
export const projectDetails = {
  spontivly: {
    title: "Spontivly",
    description: "Data dashboards for non-technical users",
    image: {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-WhNtJkfUVhAkOhZSBPAbhHNURWpkYU.png",
      alt: "Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content",
    }
  },
  immertec: {
    title: "Immertec",
    description: "VR medical training for live surgical procedures",
    image: {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-REigS5TLwDhOSRkjUpSoZzM0XHLPy1.png",
      alt: "Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors",
    }
  },
  paidly: {
    title: "Paidly",
    description: "Stripe-integrated invoicing mobile app for SMEs",
    image: {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-T3wsvxOlM1iRLfYYJAzhzlAlH5YblJ.png",
      alt: "Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form",
    }
  },
};

type PageMetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/**
 * Generate standardized metadata for a page
 */
export function generatePageMetadata({
  title,
  description = baseMetadata.description,
  path = '',
  imageUrl = baseMetadata.defaultImage,
  imageAlt = "Brendan Ciccone - 0 → 1 Staff Product Designer",
  imageWidth = 1200,
  imageHeight = 630,
}: PageMetadataParams): Metadata {
  const pageTitle = title 
    ? `${title} - Brendan Ciccone - 0 → 1 Staff Product Designer`
    : "Brendan Ciccone - 0 → 1 Staff Product Designer";
  
  const url = `${baseMetadata.baseUrl}${path}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
      locale: baseMetadata.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      creator: baseMetadata.creator,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
  };
} 