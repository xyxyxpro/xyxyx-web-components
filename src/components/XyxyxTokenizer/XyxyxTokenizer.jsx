import React, { useEffect, useRef, useState } from "react";
import styles from "./XyxyxTokenizer.module.scss";
import { getTextSegments } from "../../utils/helpers";

/**
 * XyxyxTokenizer Component
 *
 * Allows the tokenization (minting or deployment) of Tokens based on provided data.
 * Renders SVG previews and handles the deployment through API requests.
 */

const XyxyxTokenizer = ({
  isDeployAllowed = true, // Enables or disables token deployment button externally
  name, // Token name (specific to ERC404)
  ticker, // Token ticker symbol (specific to ERC404)
  supply, // Total token supply (specific to ERC404)
  contractAddress, // Existing contract address for minting (specific to ERC721F)
  tokenId, // Token ID for minting (specific to ERC721F)
  tokenText, // Token text content
  metadata, // Metadata text stored within the Token
  walletPrivateKey, // Private key for token deployment authorization
  background = "#000000", // Token background color
  textColor = "#FFFFFF", // Token text color
  fontFamily = "'Courier New', Courier, monospace", // Font family for Token text
  borderRadius = "6px", // Border radius of Token
  showDeployerAddress = false, // Toggles wallet address visibility
  walletAddress, // Wallet address displayed on Token
  showTrademark = true, // Toggles XYXYX trademark visibility
  logo, // SVG logo for the upper-left corner
  watermark, // Watermark SVG logo for Token background
  smartContract, // Type of smart contract ('ERC404' or 'ERC721F')
  network, // Blockchain network for deployment
  mintCost, // Cost for minting the token (specific to ERC721F)
  mintPrice, // Price for minting the token (specific to ERC721F)
  restrictToOwner, // Restricts deployment to the owner of the contract (specific to ERC721F)
}) => {
  // References for SVG containers
  const svgContainerRef = useRef(null);
  const watermarkRef = useRef(null);

  // Local states for deployment and token preview
  const [previewValue, setPreviewValue] = useState([tokenText]);
  const [startedDeploy, setStartedDeploy] = useState(false);
  const [tokenizedSuccessfully, setTokenizedSuccessfully] = useState(false);
  const [tokenizationError, setTokenizationError] = useState(false);

  // Update SVG content dynamically
  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = logo;
    }
  }, [logo]);

  useEffect(() => {
    if (watermarkRef.current) {
      watermarkRef.current.innerHTML = watermark;
    }
  }, [watermark]);

  // Update preview text when tokenText prop changes
  useEffect(() => {
    setTokenTextValue(tokenText);
    setTokenizationError(false);
    setTokenizedSuccessfully(false);
  }, [tokenText]);

  /**
   * Splits and validates Token text, updating preview state.
   * Ensures the segment count does not exceed 30 lines.
   * @param {string} value - The Token text content to tokenize.
   */
  const setTokenTextValue = (value) => {
    const updatedTokenText = getTextSegments(value);
    if (updatedTokenText.length > 30) {
      return;
    } else {
      setPreviewValue(updatedTokenText);
    }
  };

  /**
   * Handles deployment or minting of the token through API request.
   */
  const deploy = async () => {
    setStartedDeploy(true);
    try {
      let response;
      const formattedText = previewValue.join("\\n"); // Escaped string with new lines

      if (smartContract === "ERC404") {
        // Deploy ERC404 token via API
        response = await fetch(
          `https://api.xyxyx.pro/api/v1/ERC404/${network}/deploy-contract-1x1`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              ticker: ticker,
              decimals: 18,
              supply,
              walletPrivateKey,
              tokenText: formattedText,
              metadata: metadata,
              background,
              textColor,
              borderRadius,
              fontFamily,
              showTrademark,
              showDeployerAddress,
            }),
          },
        );
      } else if (smartContract === "ERC721F") {
        // Mint ERC721F token via API
        response = await fetch(
          `https://api.xyxyx.pro/api/v1/ERC721F/${network}/mint-token-1x1`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contractAddress,
              tokenId,
              walletPrivateKey,
              mintCost,
              metadata: metadata,
              tokenText: formattedText,
              background,
              textColor,
              borderRadius,
              fontFamily,
              showTrademark,
              showDeployerAddress,
              restrictToOwner,
            }),
          },
        );
      } else if (smartContract === "ERC721") {
        // Mint ERC721 token via API
        response = await fetch(
          `https://api.xyxyx.pro/api/v1/ERC721/${network}/mint-token-1x1`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contractAddress,
              tokenId,
              walletPrivateKey,
              mintPrice,
              metadata: metadata,
              tokenText: formattedText,
              background,
              textColor,
              borderRadius,
              fontFamily,
              showTrademark,
              showDeployerAddress,
            }),
          },
        );
      }

      if (response.success === false) {
        setStartedDeploy(false);
        setTokenizationError(true);
        throw new Error("Tokenization failed");
      }

      const responseData = await response.json();
      setTokenizedSuccessfully(true);
      setStartedDeploy(false);
      console.log("Tokenization successful:", responseData);
    } catch (error) {
      console.error("Tokenization error:", error);
      setStartedDeploy(false);
    }
  };
  // Render SVG preview and tokenize button
  return (
    <div className={styles.container}>
      <section>
        {/* Token SVG preview section */}
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <script xmlns="" type="text/javascript" />
          <rect
            width="100%"
            height="300px"
            fill={background}
            borderRadius={`${borderRadius}px`}
            rx={borderRadius}
            ry={borderRadius}
          />
          {watermark && (
            <svg
              ref={watermarkRef}
              opacity="0.1"
              x="0"
              y="0"
              width="300"
              height="300"
              dangerouslySetInnerHTML={{ __html: watermark }}
            />
          )}
          {logo && (
            <svg
              ref={svgContainerRef}
              x="10"
              y="10"
              width="30"
              height="30"
              dangerouslySetInnerHTML={{ __html: logo }}
            />
          )}
          {/* Token text content */}
          <text x="10" y={logo ? "60" : "20"} fontSize="10px" fill={textColor}>
            {previewValue?.map((segment, index) => (
              <tspan
                key={index}
                x="10"
                dy={index === 0 ? 0 : "1.2em"}
                fontFamily={fontFamily}
                fontSize="10px"
              >
                {segment}
              </tspan>
            ))}
          </text>
          {showDeployerAddress && (
            <text
              x="10"
              y="290"
              fontSize="5px"
              fontFamily={fontFamily}
              fill={textColor}
            >
              {walletAddress}
            </text>
          )}
          {/* XYXYX Trademark SVG */}
          {showTrademark && (
            <g
              transform="translate(242.000000,290.000000) scale(0.0027,-0.0027)"
              fill={textColor}
              stroke="none"
            >
              <path d="M1192 4539 c-131 -22 -236 -77 -353 -188 -107 -99 -309 -349 -309 -381 0 -9 174 -130 188 -130 5 0 36 41 70 90 138 199 228 266 344 258 134 -10 172 -80 283 -520 43 -171 155 -694 155 -722 0 -10 -388 -490 -522 -646 -217 -251 -313 -330 -407 -330 -51 0 -84 28 -102 89 l-12 42 -106 -3 -106 -3 -62 -275 c-33 -151 -58 -278 -54 -283 19 -20 179 -39 281 -34 283 15 410 119 822 669 84 112 194 261 243 331 50 69 97 127 105 127 12 0 20 -31 38 -140 29 -184 103 -503 143 -626 58 -174 149 -285 277 -336 50 -20 75 -22 192 -22 119 0 145 3 217 27 108 36 208 104 315 215 82 86 258 310 258 330 0 15 -190 136 -199 126 -4 -5 -34 -47 -66 -93 -132 -190 -222 -257 -336 -249 -94 7 -152 66 -199 204 -57 162 -149 534 -215 868 l-44 220 52 65 c400 507 629 766 730 825 24 14 64 29 88 32 39 5 49 3 77 -21 17 -14 37 -44 43 -66 l12 -39 108 0 107 0 7 33 c4 17 31 142 61 276 41 187 51 247 42 252 -59 37 -360 37 -462 1 -197 -71 -380 -269 -840 -910 -59 -81 -94 -122 -105 -120 -11 2 -19 25 -28 83 -29 179 -85 450 -114 546 -79 266 -191 394 -373 428 -69 13 -168 13 -244 0z"></path>
              <path d="M4388 4540 c-178 -21 -347 -120 -499 -290 -77 -86 -209 -260 -209 -277 0 -12 171 -133 188 -133 5 0 35 39 68 87 123 182 225 263 329 263 99 0 160 -69 219 -247 47 -143 51 -163 150 -633 129 -618 280 -1399 326 -1692 l13 -77 -83 -113 c-154 -209 -274 -352 -415 -494 -197 -200 -335 -284 -465 -287 -89 -2 -130 39 -145 145 l-7 48 -119 0 -118 0 -10 -37 c-6 -21 -36 -154 -67 -297 -44 -204 -54 -260 -43 -266 31 -20 154 -34 274 -33 105 1 149 6 227 26 353 93 706 420 1260 1167 671 905 1258 1937 1587 2790 l60 155 -36 65 c-20 36 -40 71 -46 78 -7 9 -101 12 -408 12 -223 0 -400 -4 -403 -9 -3 -5 -12 -39 -20 -75 -13 -65 -13 -66 8 -70 149 -29 185 -46 220 -106 31 -53 30 -274 -2 -420 -104 -471 -367 -1037 -755 -1627 -55 -84 -103 -153 -106 -153 -4 0 -21 107 -40 238 -80 581 -227 1442 -288 1692 -43 179 -110 340 -175 422 -42 54 -121 108 -186 128 -71 22 -196 30 -284 20z"></path>
              <path d="M8098 4540 c-215 -36 -393 -177 -612 -484 -31 -43 -56 -82 -56 -86 0 -8 176 -130 188 -130 4 0 37 41 72 92 134 190 220 258 327 258 113 0 170 -64 226 -250 55 -181 125 -477 192 -812 l38 -186 -123 -154 c-451 -560 -628 -755 -724 -799 -22 -10 -60 -19 -82 -19 -50 0 -89 34 -104 92 l-11 39 -107 -3 -106 -3 -62 -275 c-34 -151 -58 -278 -54 -283 3 -4 44 -15 91 -23 108 -21 266 -14 361 16 190 59 369 248 798 843 108 150 192 256 201 256 13 1 18 -12 23 -56 10 -85 72 -387 112 -547 95 -379 214 -510 475 -523 227 -12 391 58 571 245 82 85 258 310 258 330 0 5 -43 38 -96 73 l-97 64 -16 -25 c-58 -88 -137 -191 -181 -236 -71 -72 -127 -97 -206 -92 -109 7 -157 62 -219 252 -49 149 -138 513 -195 801 l-49 239 137 171 c346 434 555 665 646 719 98 58 173 40 204 -46 l17 -48 107 0 c60 0 108 2 108 5 0 3 27 128 61 277 47 213 57 273 47 279 -59 37 -359 37 -461 1 -119 -43 -278 -178 -433 -367 -61 -74 -287 -376 -418 -558 -52 -72 -83 -107 -94 -105 -12 2 -20 24 -29 83 -64 400 -125 630 -204 771 -32 56 -117 142 -168 168 -75 39 -236 55 -353 36z"></path>
              <path d="M11290 4540 c-176 -22 -338 -113 -482 -269 -72 -78 -228 -283 -228 -299 0 -11 171 -132 187 -132 5 0 41 47 82 104 121 174 213 245 314 246 89 0 144 -49 196 -174 42 -101 76 -234 155 -606 131 -616 356 -1789 356 -1853 0 -46 -294 -419 -480 -610 -181 -186 -308 -272 -439 -297 -110 -21 -168 23 -185 142 l-7 48 -119 0 -119 0 -10 -37 c-5 -21 -35 -154 -66 -297 -44 -201 -54 -260 -44 -267 31 -19 154 -33 274 -32 105 1 149 6 228 26 341 90 669 384 1176 1057 735 974 1331 2014 1692 2954 l38 100 -42 78 -42 78 -405 -2 -405 -3 -14 -61 c-18 -78 -12 -94 33 -94 53 0 142 -37 170 -71 65 -77 65 -246 1 -524 -80 -343 -291 -822 -563 -1275 -121 -202 -274 -432 -282 -423 -4 4 -29 159 -55 343 -74 525 -210 1323 -265 1560 -82 347 -200 525 -380 574 -72 19 -188 26 -270 16z"></path>
              <path d="M14998 4540 c-176 -30 -327 -131 -491 -328 -71 -85 -177 -230 -177 -242 0 -4 43 -36 96 -71 93 -61 97 -63 111 -44 203 285 259 334 383 335 83 0 131 -34 175 -125 56 -113 155 -503 247 -965 l31 -157 -98 -124 c-416 -524 -652 -786 -748 -830 -23 -10 -61 -19 -83 -19 -50 0 -83 29 -100 87 l-11 38 -108 0 -108 0 -62 -278 -62 -279 22 -8 c50 -19 192 -33 279 -27 237 16 373 112 652 461 106 133 471 628 481 654 3 6 13 12 23 12 15 0 20 -15 30 -82 31 -215 118 -594 167 -723 55 -147 149 -252 265 -297 77 -30 232 -36 334 -13 156 34 252 93 394 241 86 89 250 299 250 320 0 6 -43 40 -96 75 -85 56 -98 61 -108 47 -6 -9 -40 -57 -74 -107 -127 -180 -204 -236 -317 -229 -83 5 -127 38 -172 129 -56 113 -158 503 -247 947 l-43 213 21 27 c318 414 635 778 742 852 57 40 125 56 165 40 29 -13 69 -72 69 -105 0 -13 18 -15 109 -15 l109 0 10 43 c6 23 34 147 62 276 42 188 49 235 39 242 -60 37 -359 37 -462 0 -194 -69 -372 -261 -830 -896 -120 -168 -126 -168 -149 -20 -86 558 -182 800 -354 901 -78 46 -239 65 -366 44z"></path>
            </g>
          )}
        </svg>
        <div className={styles.containerDeployButton}>
          <button
            className={styles.deployButton}
            style={{ cursor: "pointer" }}
            disabled={!isDeployAllowed || startedDeploy}
            onClick={() => deploy()}
          >
            {startedDeploy
              ? tokenizationError
                ? "Tokenization failed"
                : tokenizedSuccessfully
                  ? "Tokenized"
                  : "Tokenizing..."
              : "Tokenize"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default XyxyxTokenizer;
