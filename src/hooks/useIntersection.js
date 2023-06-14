import { useState, useEffect, useRef } from "react"

const useIntersection = () => {
	const [isVisible, setVisibility] = useState(false);

  const intersectionRef = useRef();

	useEffect(() => {
    let options = {
      root: null,
      rootMargin: '300px 0px',
      threshold: 0
    };

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          setVisibility(true);
        } else {
          setVisibility(false);
        }
      });
    }, options);
    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

	return [intersectionRef, isVisible]
}

export default useIntersection