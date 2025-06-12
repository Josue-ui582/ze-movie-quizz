
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  return (
    <Text fontSize="2xl" fontWeight="bold">
      Temps restant : {timeLeft}s
    </Text>
  );
};

export default Timer;