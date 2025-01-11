import {
    CodeBracketIcon,
    ServerStackIcon,
    ChartBarIcon,
    CpuChipIcon,
    AcademicCapIcon,
    CloudIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
    PuzzlePieceIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export const languageOptions = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "portuguese", label: "Portuguese" },
    { id: "arabic", label: "Arabic" },
    { id: "russian", label: "Russian" },
];

export const courseLevelOptions = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
];

export const courseCategories = [
    { id: "web-development", label: "Web Development", icon: CodeBracketIcon , color : "bg-orange-100" },
    { id: "backend-development", label: "Backend Development", icon: ServerStackIcon , color : "bg-pink-100" },
    { id: "data-science", label: "Data Science", icon: ChartBarIcon, color : "bg-purple-100" },
    { id: "machine-learning", label: "Machine Learning", icon: CpuChipIcon, color : "bg-green-100" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", icon: AcademicCapIcon , color : "bg-red-100" },
    { id: "cloud-computing", label: "Cloud Computing", icon: CloudIcon , color : "bg-violet-100"},
    { id: "cyber-security", label: "Cyber Security", icon: ShieldCheckIcon , color : "bg-blue-100"},
    { id: "mobile-development", label: "Mobile Development", icon: DevicePhoneMobileIcon, color : "bg-yellow-100" },
    { id: "game-development", label: "Game Development", icon: PuzzlePieceIcon, color : "bg-cyan-100" },
    { id: "software-engineering", label: "Software Engineering", icon: Cog6ToothIcon , color : "bg-gray-100"},
];

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
    primaryLanguage: languageOptions,
};