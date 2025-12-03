import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { keyframes, styled } from "@mui/system";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const popIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  80% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;

const GlowFab = styled(Fab)(({ theme }) => ({
  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
  color: "white",
  width: 65,
  height: 65,
  boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)",
  animation: `${float} 3s ease-in-out infinite`,
  transition: "0.3s",

  "&:hover": {
    background: "linear-gradient(135deg, #6D28D9, #4338CA)",
    boxShadow: "0 12px 30px rgba(124, 58, 237, 0.6)",
    transform: "scale(1.1)",
  },
}));

export default function FloatingFeedbackButton({ onOpen }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        animation: show ? `${popIn} 0.5s ease-out` : "none",
        transformOrigin: "bottom right",
      }}
    >
      <Tooltip title="Chat with us / Give feedback" placement="left">
        <GlowFab onClick={onOpen}>
          <ChatBubbleOutlineIcon sx={{ fontSize: 30 }} />
        </GlowFab>
      </Tooltip>
    </div>
  );
}
