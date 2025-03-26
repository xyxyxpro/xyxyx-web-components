import XyxyxTokenizer from "../components/XyxyxTokenizer/XyxyxTokenizer";

const tokenText = `Tokenized Real Estate Certificates
----------------------------------

Certificate Number: 1234567890
Property Address: 123 Main Street
Token ID: ABCD1234
Owner: John Doe
Investment Amount: $10,000

Certificate Number: 0987654321
Property Address: 456 Elm Avenue
Token ID: EFGH5678
Owner: Jane Smith
Investment Amount: $15,000

Certificate Number: 2468013579
Property Address: 789 Oak Lane
Token ID: IJKL91011
Owner: David Johnson
Investment Amount: $20,000`;

const tokenText2 = `Tokenized Rare Item Certificates
--------------------------------
Certificate ID: 2356-RT87
Owner: John Doe
Item Name: Legendary Sword
Rarity Level: 5
Issue Date: 12/03/2022
--------------------------------
Certificate ID: 7543-YT21
Owner: Jane Smith
Item Name: Ancient Amulet
Rarity Level: 4
Issue Date: 05/08/2021
--------------------------------`;

const svgBackground = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1045.000000 1045.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,1045.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M3490 10055 c-457 -61 -786 -210 -1148 -517 -197 -167 -551 -558 -758 -838 -150 -202 -324 -453 -324 -467 0 -8 583 -397 610 -407 11 -4 33 22 75 86 89 137 307 440 393 548 220 274 402 413 607 465 95 24 277 25 365 1 212 -57 352 -233 479 -601 110 -317 334 -1179 467 -1794 93 -431 163 -770 234 -1129 l82 -412 -68 -88 c-217 -278 -1014 -1264 -1303 -1612 -611 -735 -1004 -1143 -1238 -1287 -168 -103 -374 -132 -492 -67 -100 54 -148 140 -195 347 l-6 27 -337 -2 -337 -3 -47 -215 c-26 -118 -57 -258 -69 -310 -21 -97 -44 -200 -80 -360 -11 -49 -29 -129 -40 -177 -35 -157 -150 -683 -150 -689 0 -19 216 -76 385 -100 167 -24 570 -24 745 0 247 34 363 66 535 151 553 271 1142 950 2624 3025 140 195 261 361 270 368 19 16 90 10 101 -8 4 -7 11 -44 15 -84 37 -386 279 -1554 439 -2121 160 -567 372 -919 686 -1138 244 -169 595 -247 989 -218 497 35 869 178 1238 476 100 80 329 304 445 435 101 114 300 363 412 515 94 126 286 400 286 407 0 3 -24 20 -52 38 -29 19 -167 110 -307 202 -139 92 -257 168 -261 168 -4 0 -46 -58 -94 -128 -451 -673 -677 -898 -979 -974 -67 -17 -102 -20 -197 -15 -175 7 -277 53 -396 178 -79 84 -116 139 -174 262 -142 298 -392 1217 -644 2372 -85 389 -256 1249 -256 1287 0 25 893 1137 1399 1743 386 462 776 870 970 1013 161 120 298 173 448 174 71 0 93 -4 138 -27 96 -47 152 -129 190 -279 l23 -91 340 -3 340 -2 7 37 c7 42 169 779 295 1346 44 197 80 362 80 367 0 5 -38 21 -84 35 -211 64 -460 91 -766 82 -371 -12 -583 -55 -813 -167 -473 -230 -965 -743 -1818 -1895 -69 -93 -164 -222 -211 -285 -107 -145 -306 -420 -546 -757 l-187 -262 -56 -1 -57 0 -6 48 c-4 26 -27 173 -52 327 -156 988 -301 1601 -480 2039 -236 576 -548 857 -1050 947 -154 28 -479 35 -634 14z"></path></g></svg>`;

export default {
  title: "Components/XyxyxTokenizer",
  component: XyxyxTokenizer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    background: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { tokenText: tokenText },
};

export const Primary = {
  args: {
    tokenText: tokenText,
    metadataText: "Metadata info.",
    background: "#000",
    textColor: "#fff",
    borderRadius: "5px",
    fontFamily: "'Courier New', Courier, monospace",
    borderRadius: "5px",
    showTrademark: true,
    isDeployAllowed: true,
  },
};

export const LogoAndWatermark = {
  args: {
    tokenText: tokenText2,
    metadataText: "metadata info",
    background: "#FFF",
    textColor: "#000",
    fontFamily: "'Times New Roman', Times, serif",
    borderRadius: "12px",
    logo: svgBackground,
    watermark: svgBackground,
    showTrademark: false,
    isDeployAllowed: true,
  },
};
