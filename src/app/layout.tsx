import type { Metadata } from "next"
import {Hammersmith_One, Inter} from "next/font/google"
import "./globals.css"
import {ReactNode} from "react";

const inter = Hammersmith_One({
    display: "swap", weight: "400", subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "spectratone",
}

const RootLayout = ({
    children,
}: {
    children: ReactNode
}) => {
    return (
        <html lang="jp">
            <body className={inter.className}>{children}</body>
        </html>
    )
}

export default RootLayout
