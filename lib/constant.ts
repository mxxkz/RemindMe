export enum CollectionColors {
    flower = "bg-gradient-to-r from-violet-600 to-pink-500",
    candy = "bg-gradient-to-r from-fuchsia-600 to-yellow-400",
    woody = "bg-gradient-to-r from-yellow-900 to-amber-300",
    mango = "bg-gradient-to-r from-orange-600 to-yellow-300",
    sunset = "bg-gradient-to-r from-red-500 to-yellow-500",
    summer = "bg-gradient-to-r from-cyan-400 to-orange-300",
    mint = "bg-gradient-to-r from-cyan-700 to-teal-500",
    pine = "bg-gradient-to-r from-green-900 to-green-500",
    titanium = "bg-gradient-to-r from-slate-600 to-cyan-800",
    ocean = "bg-gradient-to-r from-indigo-800 to-sky-500",
}

export type CollectionColor = keyof typeof  CollectionColors
