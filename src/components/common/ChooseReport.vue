<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Choose your report"
    view-sub-title="Choose the type of report you want to send."
  >
    <template #desktop-navigation>
      <HiveLink to-name="report-abuse" link-type="secondary">Report abuse</HiveLink>
      <HiveLink to-name="identity-verification" link-type="secondary"
        >Content / Identity Verification</HiveLink
      >
    </template>
  </ViewContents>
</template>
