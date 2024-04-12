<script setup lang="ts">
import { useMemberStore } from '@/stores'
import http from '@/utils/http'

const memberStore = useMemberStore()
let profile = memberStore.getProfile()
const getData = async () => {
  const res = await http<{ id: string; imgUrl: string; hrefUrl: string; type: string }[]>({
    method: 'GET',
    url: '/home/banner',
  })
  console.log('res = ', res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ profile?.nickname }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123',
        })
      "
      size="mini"
      type="primary"
      plain
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="primary">测试请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
