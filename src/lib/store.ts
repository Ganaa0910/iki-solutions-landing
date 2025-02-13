import { writable } from 'svelte/store';
import type { Project } from './types';

export const projects: Record<string, Project> = {
  mintpark: {
    title: "Mint Park",
    description: "MintPark is a cutting-edge NFT marketplace built on Bitcoin's Layer 2, designed to offer fast, low-cost transactions and seamless minting of digital assets. It provides a no-code tool for artists, enabling creators to easily mint and manage their NFTs without technical expertise. ",
    description2: "As a Bitcoin Ordinals-enabled marketplace, MintPark supports innovative features like wrapped NFTs and aims to connect all Bitcoin Layer 2 solutions, removing liquidity fragmentation and creating a unified ecosystem for creators and collectors. MintPark bridges the gap between Bitcoin's security and the growing demand for scalable, efficient NFT solutions.",
    image: "/Mintpark.png",
    tags: ["Cross-Chain Marketplace", "CaaS", "Creator Program"],
    projectImage1: "/mintpark2.png",
    projectDuration: "4 months",
    servicesProvided: "dApp Development",
  },
  lumi: {
    title: "Lumi",
    description: "Capture, share, and savor life’s flavors – your way. Snap a photo of your culinary adventures, share stories, and post them as moments that vanish after 72 hours – perfect for spontaneous, in-the-now connections. Love a memory too much to let it fade? Mint it as a Memory NFT to immortalize it forever on Monad’s blockchain.",
    description2: "",
    image: "/Lumi.png",
    tags: ["Social Media", "Restaurant Loyalty", "EVM"],
    projectImage1: "/lumi2.png",
    projectDuration: "4 months",
    servicesProvided: "Mobile App development",
  },
  pepepunks: {
    title: "Pepe Punks",
    description: "Pepe Punks represents a breakthrough in Bitcoin Ordinals, pushing the limits of digital artifact creation through advanced inscription techniques. Our team implemented cursed inscriptions, re-inscriptions, and recursive inscriptions on a specially selected Block 9 sat. We engineered a custom minter that navigated Bitcoin's lack of native smart contracts, developed a solution to manage the tedious distribution and minting process. ",
    description2: "The collection achieved landmark status in the Ordinals ecosystem, becoming one of the largest cursed sat collections. Each “sat” was meticulously inscribed twice, earning early eligibility for the Runestone airdrop and demonstrated the innovative potential of Ordinals technology.",
    image: "/PepePunks.png",
    tags: ["Rare Sat", "Dual Inscription", "Recursive Inscriptions"],
    projectImage1: "/PepePunks2.png",
    projectDuration: "1 month",
    servicesProvided: "Ordinals Collection",
  },
  satoshipunks: {
    title: "Satoshi Punks ",
    description: "Satoshi Punks (#36151-#73597) is a trailblazing Bitcoin NFT collection from the rare sub-100k Ordinals, featuring 100 unique Punks that have already driven 10 BTC in trading volume. As one of only eight collections featured on Magic Eden’s Bitcoin NFT launch, Satoshi Punks represents authenticity, decentralization, and the future of digital ownership on Bitcoin.",
    description2: "This isn’t just art – it’s a movement. Join the tribe of true believers and own a piece of history as we redefine self-expression and innovation on the Bitcoin blockchain.",
    image: "/SatoshiPunks.webp",
    tags: ["Ordinals", "Sub100k Ordinal", "Inscriptions"],
    projectImage1: "/satoshi2.png",
    projectDuration: "1 month",
    servicesProvided: "NFT Collection",
  },
  shapetown: {
    title: "Shape Town",
    description: "Shape Town, a finalist in the ShapeCraft Hackathon where cozy gaming meets Web3 innovation. Built on the EVM-compatible Shape Chain, this charming pixel world transforms your gaming achievements into real digital assets. Farm rare crops, fish in crystal-clear waters, or brave mysterious dungeons – every adventure matters in Shape Town. Craft unique tools and weapons that become yours as NFTs, secured on the blockchain. Team up with friends for exciting dungeon raids or trade resources in our vibrant marketplace. Community-Driven Economy Join a thriving community where every player shapes the world. Trade your crafted NFTs, share resources, and connect with fellow townspeople in our social spaces. Coming soon: Participate in our DEX ecosystem to trade items seamlessly and earn rewards by providing liquidity to LP pools.",
    description2: "Whether you're a peaceful farmer, adventurous explorer, or savvy trader, Shape Town is your pixel paradise. Built on Shape Chain's robust platform, enjoy:\n\n• True ownership of all in-game assets\n• Secure trading and crafting\n• Low transaction costs\n• Active community engagement\n\nJoin us in Shape Town – where blockchain gaming feels like coming home.",
    image: "/ShapeTown.png",
    tags: ["Play 2 Earn", "Phaser"],
    projectImage1: "/shape2.png",
    projectDuration: "4 months",
    servicesProvided: "Game Development",
},
  araafal: {
    title: "Araafal",
    description: "Enter the exciting world of Bitcoin Ordinals through Araafal, a pioneering decentralized raffle platform built natively on Bitcoin. Win unique Ordinal inscriptions using your BRC-20 tokens in an engaging and dynamic environment. Your Gateway to Ordinals Create your own raffles for any Ordinal inscription Participate using BRC-20 tokens to earn tickets Win rare and valuable Bitcoin-native digital artifacts",
    description2: "Create or join raffles in minutes. Whether you're showcasing your Ordinals or trying your luck at winning them, Araafal makes it seamless and secure.",
    image: "/Araafal.png",
    tags: ["Ordinals", "BRC20", "Bitcoin Mainnet"],
    projectImage1: "/araafal2.png",
    projectDuration: "4 months",
    servicesProvided: "dApp Development",
  },
};

export const currentProject = writable<Project | null>(null);
