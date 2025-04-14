export const goToTarget = (target: string, offset = 100) => {
  const section = document.getElementById(target);

  if (section) {
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - offset;
    console.log(sectionTop);

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
};
