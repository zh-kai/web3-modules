export const openExternalLink = (link: string | undefined) => {
  // @note: return empty link
  if (!link) return;

  const external = window.open(link, "_blank");
  // @note: window.open not work
  if (!external) window.location.href = link;
};
