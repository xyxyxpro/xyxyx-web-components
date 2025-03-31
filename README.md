# xyxyx-web-components

`xyxyx-web-components` is an npm package designed to integrate Xyxyx API's text-based tokenization functionalities within React applications.

---

## Installation

Install the package via npm or yarn:

```bash
npm install xyxyx-web-components
```

or

```bash
yarn add xyxyx-web-components
```

---

## Xyxyx Tokenizer

`XyxyxTokenizer` is the first component included in the `xyxyx-web-components` package. It provides a simple and intuitive user interface that simplifies and streamlines the process of contract deployment and token issuance. Xyxyx Tokenizer is specifically designed for the 1x1 tokenization model, with the Xyxyxx API underneath.

### Features

- Supports the integration of 1x1 smart contract deployment & token issuance into any React application, with the Xyxyx API serving as the execution layer behind the scenes
- Enables the generation of 1x1 token previews in SVG format
- Provides easy error handling and state management for 1x1 contract deployment and token issuance

### Intended Use

- ERC-721F: You need an already deployed ERC-721F contract. The Xyxyx Tokenizer will be used to streamline the individualized minting of tokens for this contract.
- ERC-404: The Xyxyx Tokenizer helps you deploy an ERC-404 smart contract, arbitraging via Tokenizer the token SVG output for the entire token supply.
- ERC-721: The process is the same as for ERC-404.

### 1x1 Props

| Prop Name            | Type     | Description                                                              | Default                                                |
|----------------------|----------|--------------------------------------------------------------------------|--------------------------------------------------------|
| `isDeployAllowed`    | Boolean  | Enables or disables contract deployment/token issuance button externally                   | `true`                                                 |                                                    |
| `tokenText`          | String   | The text content that is stamped in the token SVG output                                                | -                                                      |
| `metadata`       | String   | The text content that is inserted in the token metadata, stored within its SVG file                                       | -                                                        |
| `background`         | String   | Hexadecimal color for the token output background                                                        | `#000000`                                              |
| `textColor`          | String   | Hexadecimal color for the token output text                                                               | `#FFFFFF`                                              |
| `fontFamily`         | String   | Font-family that is used in the token output text                                                              | `'Courier New', Courier, monospace`                    |
| `borderRadius`       | String   | Border radius that is applied to the token output                                           | `6px`                                                  |
| `showDeployerAddress`| Boolean  | Deployer address displayed on the token output bottom left corner                             | `false`                                                |
| `logo`               | String   | 1:1 SVG that is displayed on the top left corner of the token output                             | -                                                      |
| `watermark`          | String   | 1:1 SVG that is displayed in the background of the token output (with 70% opacity)                             | -                                                 |
| `showTrademark`      | Boolean  | Xyxyx trademark displayed on the token output bottom right corner                                   | `true`                                                 |

### ERC-721F Props (Token Mint)
| Prop Name            | Type     | Description                                                              | Default                                                |
|----------------------|----------|--------------------------------------------------------------------------|--------------------------------------------------------|
| `contractAddress`    | String   | Existing ERC-721F contract address                     | -                                                      |
| `tokenId`            | Integer   | Token ID of the token to be minted                                      | -      
| `mintCost`           | Integer   | Amount required to mint a token                     | -
| `smartContract`      | String   | Token standard (`ERC721F`)                           | -                                                      |
| `network`            | String   | Blockchain network to mint the token                                     | -                     
| `walletPrivateKey`   | String   | Deployer private key for authorizing transaction                                     | -                                                      |                                     |

### ERC-404 Props (Smart Contract Deploy)
| Prop Name            | Type     | Description                                                              | Default                                                |
|----------------------|----------|--------------------------------------------------------------------------|--------------------------------------------------------|
| `name`          | String   | Token name                                              | -                                                      |
| `ticker`        | String   | Token ticker                                       | -                                                      |
| `decimals`        | String   | Token decimals                                       | -                                                      |
| `supply`             | Integer   | Token total supply                                       | -                                                      |
| `smartContract`      | String   | Token standard (`ERC404`)                           | -                                                      |
| `network`            | String   | Blockchain network to deploy the contract                                     | -   
| `walletPrivateKey`   | String   | Deployer private key for authorizing transaction                                      | -  |

### ERC-721 Props (Smart Contract Deploy)
| Prop Name            | Type     | Description                                                              | Default                                                |
|----------------------|----------|--------------------------------------------------------------------------|--------------------------------------------------------|
| `name`          | String   | Token name                                               | -                                                      |
| `ticker`        | String   | Token ticker symbol                                       | -                                                      |
| `supply`             | Integer   | Token total supply                                         | -                                                      |
| `mintPrice`             | Integer   | Token mint price                                       | -                                                      |
| `restrictToOwner`             | Boolean   | Defines if minting is restricted to contract owner                                       | `false`                                                      |
| `smartContract`      | String   | Token standard (`ERC721`)                           | -                                                      |
| `network`            | String   | Blockchain network to deploy the contract                                       | -   
| `walletPrivateKey`   | String   | Deployer private key for authorizing transaction                                     | -  |

---

### Usage Example

Here's a basic usage example demonstrating how to integrate the `XyxyxTokenizer` component into your React app:

```jsx
import React from 'react';
import { XyxyxTokenizer } from 'xyxyx-web-components';

const App = () => (
  <XyxyxTokenizer
    name="Lorem Ipsum"
    ticker="LI"
    supply={1}
    tokenText="Insert the token SVG output text here"
    metadata="Insert the token metadata here"
    walletPrivateKey="your-wallet-private-key"
    background="#000000"
    textColor="#FFFFFF"
    fontFamily="Arial, sans-serif"
    borderRadius="10"
    showDeployerAddress={true}
    smartContract="ERC404"
    network="mainnet"
/>
);
```
---

### Development

To contribute or further develop `xyxyx-web-components`, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/xyxyx-web-components.git
```

2. Install dependencies:

```bash
npm install
```

3. Run local development environment:

```bash
npm start
```

---

### Local Preview with Storybook

If you'd like to preview and interact with the components locally, you can use Storybook. Follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Run Storybook:

```bash
npm run storybook
```

This will start Storybook on your local server, typically at `http://localhost:6006`, where you can preview and interact with components.

---

### Support & Feedback

For support or feedback, open an issue in this repository or contact the project maintainer.
