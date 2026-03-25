import type React from "react"

interface EffortlessIntegrationProps {
  /** Fixed width from Figma: 482px */
  width?: number | string
  /** Fixed height from Figma: 300px */
  height?: number | string
  /** Optional className to pass to root */
  className?: string
}

/**
 * Effortless Integration – Service integration constellation
 * Three concentric rings with logos positioned on ring axes
 */
const EffortlessIntegration: React.FC<EffortlessIntegrationProps> = ({ width = 482, height = 300, className = "" }) => {
  const centerX = 250
  const centerY = 179
  const rings = [
    { radius: 80, logos: 2 }, // Inner ring - 2 logos
    { radius: 120, logos: 3 }, // Middle ring - 3 logos
    { radius: 160, logos: 2 }, // Outer ring - 2 logos
  ]

  const getPositionOnRing = (ringRadius: number, angle: number) => ({
    x: centerX + ringRadius * Math.cos(angle),
    y: centerY + ringRadius * Math.sin(angle),
  })

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.1) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "1px solid rgba(55, 50, 47, 0.2)",
          opacity: 0.8,
        }}
      />
      {/* Middle ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          border: "1px solid rgba(55, 50, 47, 0.25)",
          opacity: 0.7,
        }}
      />
      {/* Inner ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(55, 50, 47, 0.3)",
          opacity: 0.6,
        }}
      />

      {/* Company logos positioned systematically on ring axes */}
      <div
        style={{
          width: "500px",
          height: "358px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        {/* Central hub */}
        <div
          style={{
            width: "72px",
            height: "72px",
            left: `${centerX - 36}px`,
            top: `${centerY - 36}px`,
            position: "absolute",
            background: "#37322f",
            border: "1px solid black",
            borderRadius: "99px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            color: "#ffffff",
          }}
        >
          b
        </div>

        {/* GitHub - 180° (left) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(80, Math.PI).x - 16}px`,
            top: `${getPositionOnRing(80, Math.PI).y - 16}px`,
            position: "absolute",
            background: "#000000",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E"
            alt="GitHub"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        {/* Slack - 0° (right) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(80, 0).x - 16}px`,
            top: `${getPositionOnRing(80, 0).y - 16}px`,
            position: "absolute",
            background: "#ffffff",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52h-2.521zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.958 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.52 2.521h-2.522v-2.521zM17.687 8.834a2.527 2.527 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zM15.166 18.958a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.522v-2.52h2.521zM15.166 17.687a2.527 2.527 0 0 1-2.521-2.521 2.527 2.527 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z'/%3E%3C/svg%3E"
            alt="Slack"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        {/* Figma - 315° (top-right) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(120, -Math.PI / 4).x - 16}px`,
            top: `${getPositionOnRing(120, -Math.PI / 4).y - 16}px`,
            position: "absolute",
            background: "#EEEFE8",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 5.5a3.5 3.5 0 1 1 0 7c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5zM12 0a5.5 5.5 0 0 1 5.5 5.5v5.5a5.5 5.5 0 0 1-11 0V5.5A5.5 5.5 0 0 1 12 0zm0 13a5.5 5.5 0 0 1 5.5 5.5v5.5H12v-5.5a3.5 3.5 0 1 0-7 0v5.5H1v-5.5A5.5 5.5 0 0 1 6.5 13H12z'/%3E%3C/svg%3E"
            alt="Figma"
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        </div>

        {/* Discord - 135° (bottom-left) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(120, (3 * Math.PI) / 4).x - 16}px`,
            top: `${getPositionOnRing(120, (3 * Math.PI) / 4).y - 16}px`,
            position: "absolute",
            background: "#5865F2",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z'/%3E%3C/svg%3E"
            alt="Discord"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        {/* Notion - 225° (bottom-left diagonal) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(120, (5 * Math.PI) / 4).x - 16}px`,
            top: `${getPositionOnRing(120, (5 * Math.PI) / 4).y - 16}px`,
            position: "absolute",
            background: "#ffffff",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4.459 4.211c.524 0 1.011.129 1.439.349.428.221.764.539 1.001.942l3.414 5.869c.124.215.25.429.352.641.103.212.157.442.157.69 0 .584-.199 1.084-.593 1.488-.393.407-.887.61-1.472.61a2.154 2.154 0 0 1-1.442-.519l-3.351-2.903c-.22-.191-.453-.339-.7-.442a2.38 2.38 0 0 0-.895-.157c-.604 0-1.118.211-1.53.63a2.15 2.15 0 0 0-.623 1.517c0 .594.208 1.104.623 1.517.412.416.923.626 1.52.626.331 0 .611-.059.84-.176.229-.117.449-.281.658-.492l1.666-1.666c.219-.219.458-.328.718-.328.261 0 .484.09.67.271.185.18.278.399.278.654a.897.897 0 0 1-.264.646L4.542 22.06c-.412.42-.924.63-1.536.63s-1.124-.21-1.536-.63A2.115 2.115 0 0 1 .845 20.53c0-.606.208-1.118.625-1.536.417-.417.929-.625 1.536-.625.328 0 .638.067.931.202.293.134.542.31.748.528l1.097 1.097c.18.18.391.27.635.27a.885.885 0 0 0 .634-.265c.18-.176.27-.384.27-.622 0-.214-.078-.401-.235-.561L2.458 14.16c-.443-.464-.664-.99-.664-1.579 0-.604.221-1.12.664-1.549.444-.43.96-.645 1.549-.645.222 0 .43.037.625.111.196.074.385.176.568.307l3.66 2.6c.164.116.33.175.498.175.253 0 .468-.088.644-.264a.884.884 0 0 0 .264-.637c0-.206-.073-.385-.22-.538L6.447 6.447c-.201-.201-.302-.444-.302-.728 0-.253.09-.464.27-.633.18-.17.382-.255.606-.255m11.332 0c.524 0 1.011.129 1.439.349.428.221.764.539 1.001.942l3.414 5.869c.124.215.25.429.352.641.103.212.157.442.157.69 0 .584-.199 1.084-.593 1.488-.393.407-.887.61-1.472.61a2.154 2.154 0 0 1-1.442-.519l-3.351-2.903c-.22-.191-.453-.339-.7-.442a2.38 2.38 0 0 0-.895-.157c-.604 0-1.118.211-1.53.63a2.15 2.15 0 0 0-.623 1.517c0 .594.208 1.104.623 1.517.412.416.923.626 1.52.626.331 0 .611-.059.84-.176.229-.117.449-.281.658-.492l1.666-1.666c.219-.219.458-.328.718-.328.261 0 .484.09.67.271.185.18.278.399.278.654a.897.897 0 0 1-.264.646l-4.721 4.72c-.412.42-.924.63-1.536.63s-1.124-.21-1.536-.63a2.115 2.115 0 0 1-.625-1.53c0-.606.208-1.118.625-1.536.417-.417.929-.625 1.536-.625.328 0 .638.067.931.202.293.134.542.31.748.528l1.097 1.097c.18.18.391.27.635.27a.885.885 0 0 0 .634-.265c.18-.176.27-.384.27-.622 0-.214-.078-.401-.235-.561l-4.211-4.211c-.443-.464-.664-.99-.664-1.579 0-.604.221-1.12.664-1.549.444-.43.96-.645 1.549-.645.222 0 .43.037.625.111.196.074.385.176.568.307l3.66 2.6c.164.116.33.175.498.175.253 0 .468-.088.644-.264a.884.884 0 0 0 .264-.637c0-.206-.073-.385-.22-.538l-3.328-3.328c-.201-.201-.302-.444-.302-.728 0-.253.09-.464.27-.633.18-.17.382-.255.606-.255'/%3E%3C/svg%3E"
            alt="Notion"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        {/* Stripe - 180° (left) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(160, Math.PI).x - 16}px`,
            top: `${getPositionOnRing(160, Math.PI).y - 16}px`,
            position: "absolute",
            background: "#635BFF",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M13.93 7.759a.76.76 0 0 0 .002.138c.023.237.166.44.37.535l4.87 2.274a1.88 1.88 0 0 1 1.108 1.708v7.058c0 .248-.049.492-.143.719a1.881 1.881 0 0 1-2.903 1.053l-4.502-2.905a.76.76 0 0 0-.864.001l-4.502 2.905c-.21.135-.452.207-.698.207a1.88 1.88 0 0 1-1.88-1.88v-7.058a1.88 1.88 0 0 1 1.107-1.708l4.87-2.274a.757.757 0 0 0 .373-.535.772.772 0 0 0-.001-.138V1.88A1.88 1.88 0 0 1 10.727 0c.247 0 .49.049.718.143a1.88 1.88 0 0 1 1.05 2.904l-2.905 4.5a.76.76 0 0 0-.001.864l2.905 4.5a1.88 1.88 0 1 1-3.158 2.039l-2.905-4.5a.76.76 0 0 0-.864-.001l-4.5 2.905A1.88 1.88 0 1 1 .038 10.3l4.5-2.905a.76.76 0 0 0 .001-.864l-2.905-4.5A1.88 1.88 0 1 1 4.793.111l2.905 4.5a.76.76 0 0 0 .864.001l4.5-2.905A1.88 1.88 0 0 1 15.962.112l-2.905 4.5a.76.76 0 0 0-.001.864l2.905 4.5a1.88 1.88 0 1 1-2.031 3.283z'/%3E%3C/svg%3E"
            alt="Stripe"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        {/* Framer - 0° (right) */}
        <div
          style={{
            width: "32px",
            height: "32px",
            left: `${getPositionOnRing(160, 0).x - 16}px`,
            top: `${getPositionOnRing(160, 0).y - 16}px`,
            position: "absolute",
            background: "#000000",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 0L0 12L12 24V12L24 0H12Z'/%3E%3C/svg%3E"
            alt="Framer"
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        </div>

        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(55, 50, 47, 0.1)" />
              <stop offset="50%" stopColor="rgba(55, 50, 47, 0.05)" />
              <stop offset="100%" stopColor="rgba(55, 50, 47, 0.1)" />
            </linearGradient>
          </defs>

          {/* Inner ring connections */}
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(80, 0).x}
            y2={getPositionOnRing(80, 0).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.2"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(80, Math.PI).x}
            y2={getPositionOnRing(80, Math.PI).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.2"
          />

          {/* Middle ring connections */}
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, -Math.PI / 4).x}
            y2={getPositionOnRing(120, -Math.PI / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, (3 * Math.PI) / 4).x}
            y2={getPositionOnRing(120, (3 * Math.PI) / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, (5 * Math.PI) / 4).x}
            y2={getPositionOnRing(120, (5 * Math.PI) / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />

          {/* Outer ring connections */}
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(160, 0).x}
            y2={getPositionOnRing(160, 0).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.1"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(160, Math.PI).x}
            y2={getPositionOnRing(160, Math.PI).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.1"
          />
        </svg>
      </div>
    </div>
  )
}

export default EffortlessIntegration
