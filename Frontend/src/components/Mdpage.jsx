import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw' // For rendering HTML like <br>

const x = {
  "desc": "# Computer Networks: IP Addresses and Network Models\n\n### IP Address- An **IP address** is a **unique numerical identifier** assigned to each device on a network.\n- **IPv4** is the older version, represented by four numbers separated by dots (e.g., `a.b.c.d`), where each number is an **8-bit value** ranging from **0 to 255**.\n- The **limitation** of IPv4 is that it can only support a maximum of $2^{32}$ (approximately **4.3 billion**) addresses, which is insufficient given the large number of internet-connected devices today.\n- **IPv6** was developed to overcome this limitation. It uses a **128-bit number**, providing a significantly larger number of possible addresses.\n\n***\n\n### OSI Model (Open Systems Interconnection)\n\n- The **OSI model** is a **conceptual framework** that divides the complex process of network communication into **seven distinct layers**.\n- Its purpose is to simplify network design, troubleshooting, and management by separating functions into independent, manageable layers.\n- Each layer performs a specific function and is responsible for its own errors and debugging.\n\n#### The 7 Layers of the OSI Model\n\n1.  **Application Layer (Layer 7):** Provides network services directly to end-user applications (e.g., HTTP for web browsing).\n2.  **Presentation Layer (Layer 6):** Handles data formatting, encryption, and compression (e.g., SSL/TLS).\n3.  **Session Layer (Layer 5):** Manages and controls the connections (sessions) between different applications.\n4.  **Transport Layer (Layer 4):** Ensures reliable data delivery and handles segmentation and reassembly of data (e.g., TCP).\n5.  **Network Layer (Layer 3):** Responsible for routing data packets efficiently across different networks (e.g., IP).\n6.  **Data Link Layer (Layer 2):** Facilitates data communication between two directly connected devices on the same network (e.g., MAC address).\n7.  **Physical Layer (Layer 1):** Deals with the physical transmission of raw data over a communication medium (e.g., network cables, Wi-Fi signals).\n\n***\n\n### TCP/IP Suite (Modern Network Model)\n\n- The **TCP/IP suite** is a more practical, modern network model often used in place of the OSI model. It consolidates the seven OSI layers into four main layers:\n  - **Application Layer:** Combines the functions of the OSI Application, Presentation, and Session layers.\n  - **Transport Layer:** Corresponds directly to the OSI Transport layer.\n  - **Internet Layer:** Corresponds directly to the OSI Network layer.\n  - **Link Layer:** Combines the functions of the OSI Data Link and Physical layers."
}

function Mdpage() {
  const markdown = x.desc;
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 text-white">
      <div className="prose prose-invert lg:prose-xl max-w-3xl">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Mdpage
