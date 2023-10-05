<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <Toaster position="top-right" richColors closeButton />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>
