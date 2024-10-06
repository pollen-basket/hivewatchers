<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Welcome to hivewatchers"
    view-sub-title="Here, you can submit an abuse report, or fill out an identity verification form"
  >
    <template #mobile-navigation>
      <HiveLink to-name="identity-verification" link-type="secondary"
        >Content / identity verification</HiveLink
      >
      <HiveLink to-name="report-abuse" link-type="secondary">Report abuse</HiveLink>
      <HiveLink to-name="transaction-search">Transaction search</HiveLink>
      <HiveLink to-name="blacklist-search">Blacklist search</HiveLink>
    </template>
    <template #desktop-navigation>
      <HiveLink to-name="choose-report" link-type="secondary">Choose your report</HiveLink>
    </template>
  </ViewContents>
</template>
