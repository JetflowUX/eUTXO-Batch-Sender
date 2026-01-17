# eUTXO Batch Sender

A modern web application for sending multiple Cardano assets and native tokens in a single batch transaction using the eUTXO model. Built with React, TypeScript, and Vite.

## Features

- **Batch Asset Transfers**: Send multiple tokens and ADA in a single transaction
- **Multi-Asset Support**: Support for Cardano native tokens with token picker
- **Real-time Validation**: Address and amount validation with visual feedback
- **Network Fee Calculation**: Automatic fee estimation for transactions
- **Wallet Integration**: Connect to your Cardano wallet for balance visibility
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Lucide React icons

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JetflowUX/eUTXO-Batch-Sender.git
cd eUTXO-Batch-Sender
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Connect Wallet**: Connect your Cardano wallet to view your balance and address
2. **Enter Recipient**: Input the recipient's Cardano address (must start with `addr1`)
3. **Set ADA Amount**: Specify the amount of ADA to send
4. **Add Assets**: Click "Add Row" to add native tokens
5. **Select Tokens**: Choose tokens from the available token list
6. **Enter Amounts**: Specify the quantity for each token
7. **Review & Send**: Verify the transaction details and send the batch

## Project Structure

```
├── App.tsx              # Main application component
├── constants.tsx        # Constants (tokens, fees)
├── types.ts            # TypeScript type definitions
├── index.tsx           # React entry point
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── index.html          # HTML entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Supported Tokens

The application includes a list of supported Cardano native tokens. See `constants.tsx` for the available tokens and their configurations.

## Network Fees

Network fees are automatically calculated based on the transaction complexity. Current fee structure is defined in `constants.tsx`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, feature requests, or questions, please open an issue on the GitHub repository.