import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const timeFormat = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 10,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const interval = useRef(null);
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      } else {
        const leftTime = time - 1000;
        return leftTime;
      }
    });
  };
  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);
  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);
  return (
    <Text style={styles.text}>
      {timeFormat(minute)}:{timeFormat(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
