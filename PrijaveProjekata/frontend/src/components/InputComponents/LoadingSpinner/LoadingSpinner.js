import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <ClipLoader size={150} color={"#123abc"} loading={true} />
    </div>
  );
};

const styles = {
  spinnerContainer: {
    position: 'fixed',  // Ensures the spinner is positioned relative to the viewport
    top: 0,             // Aligns the top edge of the container to the top of the viewport
    left: 0,            // Aligns the left edge of the container to the left of the viewport
    width: '100%',      // Ensures the container takes the full width of the viewport
    height: '100vh',    // Ensures the container takes the full height of the viewport
    display: 'flex',    // Uses flexbox to align the contents
    justifyContent: 'center',  // Centers the spinner horizontally
    alignItems: 'center',      // Centers the spinner vertically
    backgroundColor: 'rgba(255, 255, 255, 0.5)'  // Optional: Adds a semi-transparent background to the container
  }
};

export default LoadingSpinner;
