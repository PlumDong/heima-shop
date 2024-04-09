<script setup lang="ts">
import { useMemberStore } from '@/stores'

const memberStore: { profile: any; setProfile: (p: any) => void; clearProfile: () => void } =
  useMemberStore()
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile?.nickname }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋2333',
        })
      "
      size="mini"
      type="primary"
      plain
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
  </view>
</template>

<style lang="scss">
//
</style>
