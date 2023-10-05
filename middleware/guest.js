export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  if (token.value) {
    return navigateTo("/");
  }
});
