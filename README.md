# Heritage RWA Auction & Trade House

A sophisticated platform for auctioning and trading Real World Assets (RWAs) as tokenized luxury items. Built with Next.js, React, and integrated with Sanity CMS for content management.

## 🏛️ Overview

Heritage is a premier auction house and trading platform that bridges the gap between physical luxury assets and digital ownership. Our platform enables:

- **Tokenized Luxury Assets**: High-end items represented as digital tokens
- **Secure Auctions**: Competitive bidding with blockchain-backed security
- **Expert Curation**: Vetted collections of premium assets
- **Provenance Tracking**: Complete history and authenticity verification
- **Seamless Trading**: Secondary market for tokenized assets

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Backend & Infrastructure
- **Sanity CMS** - Headless content management
- **Thirdweb** - Web3 integration and smart contracts
- **Uniswap** - Decentralized exchange integration
- **Vercel** - Hosting and deployment

### Key Libraries
- **React Hook Form** - Form management
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library
- **Zod** - Schema validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Sanity account (for CMS setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HeritageInnovation/Heritage.git
   cd Heritage
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
   - Additional Web3 and API keys as needed

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Start Sanity Studio** (optional)
   ```bash
   pnpm sanity:dev
   ```

Visit `http://localhost:3000` to view the application.

## 📁 Project Structure

```
Heritage/
├── app/                    # Next.js App Router pages
│   ├── portfolio/         # Portfolio management
│   ├── exchange/             # Trading interface
│   ├── protocol/          # Protocol information
│   └── support/           # Support pages
├── components/            # React components
│   ├── Curation/          # Expert curation views
│   ├── Trade/             # Trading components
│   └── ui/                # Reusable UI components
├── sanity/               # Sanity CMS configuration
│   └── schemas/           # Content schemas
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 Key Features

### Auction System
- Competitive bidding for luxury assets
- Real-time bid updates
- Auction history and analytics

### Portfolio Management
- Track owned assets
- Performance analytics
- Valuation insights

### Trading Interface
- Secondary market trading
- Price charts and analysis
- Order book management

### Expert Curation
- Multi-tier expert system
- Asset verification and grading
- Reputation-based curation

### Security & Provenance
- Vault storage information
- Insurance partnerships
- Complete asset history tracking

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm sanity:dev` - Start Sanity Studio

### Content Management

The Sanity CMS manages:
- Luxury item listings
- Protocol documentation
- Vault locations
- Insurance partners
- Provenance entries
- User profiles
- Curation submissions

Access the Sanity Studio at `http://localhost:3000/admin` when running `pnpm sanity:dev`.

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Visit our [Support Page]
- Check our documentation
- Open an issue on GitHub

---

Built with ❤️ by the Heritage Innovation Team
