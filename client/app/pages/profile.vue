<script setup lang="ts">
import { useUser } from "~/composables/useUser";

definePageMeta({
  layout: "admin-layout",
});

const { user } = useUser();
const message = useMessage();

// 编辑状态控制
const isEditing = ref(false);
const editForm = reactive({
  username: "",
  email: "",
  bio: "",
  avatar: "",
  banner: "",
  socials: {
    discord: "",
    twitter: "",
    twitch: "",
    osu: "",
  },
});

// 初始化编辑表单
watchEffect(() => {
  if (user.value) {
    editForm.username = user.value.username || "";
    editForm.email = user.value.email || "";
    editForm.bio = user.value.bio || "";
    editForm.avatar = user.value.avatar || "";
    editForm.banner = user.value.banner || "";
    editForm.socials = { ...user.value.socials };
  }
});

// 开始编辑
function startEditing() {
  isEditing.value = true;
  // 重置表单数据
  if (user.value) {
    editForm.username = user.value.username || "";
    editForm.email = user.value.email || "";
    editForm.bio = user.value.bio || "";
    editForm.avatar = user.value.avatar || "";
    editForm.banner = user.value.banner || "";
    editForm.socials = {
      ...(user.value.socials || {
        discord: "",
        twitter: "",
        twitch: "",
        osu: "",
      }),
    };
  }
}

// 取消编辑
function cancelEditing() {
  isEditing.value = false;
  message.info("已取消编辑");
}

// 保存修改
function handleSave() {
  // 模拟更新
  user.value.username = editForm.username;
  user.value.bio = editForm.bio;
  user.value.avatar = editForm.avatar;
  user.value.banner = editForm.banner;
  user.value.socials = { ...editForm.socials };

  isEditing.value = false;
  message.success("个人信息保存成功");
}

// 模拟数据
const activities = [
  { id: 1, type: "join", content: "报名参加了 Yuna Cup 2025", time: "2小时前" },
  {
    id: 2,
    type: "comment",
    content: "在 Osu! Mania 4K World Cup 中发表了评论",
    time: "1天前",
  },
  {
    id: 3,
    type: "achievement",
    content: '获得了 "初出茅庐" 徽章',
    time: "3天前",
  },
];

const matchHistory = [
  {
    id: 1,
    event: "Yuna Cup 2025",
    round: "RO32",
    opponent: "PlayerOne",
    result: "Win",
    score: "5 - 2",
    date: "2025-05-10",
  },
  {
    id: 2,
    event: "Yuna Cup 2025",
    round: "RO64",
    opponent: "NoobMaster",
    result: "Win",
    score: "5 - 0",
    date: "2025-05-08",
  },
  {
    id: 3,
    event: "Mania Weekly",
    round: "Final",
    opponent: "SpeedDemon",
    result: "Loss",
    score: "3 - 4",
    date: "2025-05-01",
  },
  {
    id: 4,
    event: "Mania Weekly",
    round: "Semi",
    opponent: "RhythmGod",
    result: "Win",
    score: "4 - 1",
    date: "2025-05-01",
  },
];
</script>

<template>
  <div class="space-y-6">
    <!-- 个人信息头部 -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm relative overflow-hidden group"
    >
      <!-- Banner 背景 -->
      <div class="absolute inset-0 bg-[var(--bg-card)] overflow-hidden">
        <div
          class="w-full h-full relative"
          style="
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            -webkit-mask-image: linear-gradient(
              to bottom,
              black 40%,
              transparent 100%
            );
          "
        >
          <img
            v-if="user.banner"
            :src="user.banner"
            class="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 will-change-transform transform-gpu"
            alt="Banner"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[#8ab4f8] opacity-40 relative transition-transform duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 will-change-transform transform-gpu"
          >
            <!-- 装饰性图案 -->
            <div
              class="absolute inset-0 opacity-30"
              style="
                background-image: radial-gradient(#fff 2px, transparent 2px);
                background-size: 24px 24px;
              "
            ></div>
          </div>
        </div>
      </div>

      <div class="relative px-4 md:px-8 pb-8 pt-24 md:pt-40">
        <div class="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div class="relative group/avatar">
            <n-avatar
              round
              :size="140"
              :src="
                user.avatar ||
                'https://placehold.co/150x150/6692e1/ffffff?text=User'
              "
              class="border-[6px] border-[var(--bg-card)] shadow-2xl bg-white group-hover/avatar:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-10"
            />
            <div
              class="absolute bottom-3 right-3 bg-green-500 w-6 h-6 rounded-full border-4 border-[var(--bg-card)] z-20 shadow-sm transition-transform duration-300 group-hover/avatar:scale-110"
              title="在线"
            ></div>
          </div>

          <div class="flex-1 w-full text-center md:text-left mb-2 z-10">
            <div
              class="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h1
                  class="text-4xl font-bold text-[var(--text-main)] mb-2 flex items-center justify-center md:justify-start gap-3 drop-shadow-sm"
                >
                  {{ user.username || "未登录用户" }}
                </h1>

                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3"
                >
                  <RoleTag
                    v-for="role in user.roles"
                    :key="role"
                    :role="role"
                  />
                </div>

                <p
                  class="text-[var(--text-secondary)] max-w-2xl mx-auto md:mx-0 line-clamp-2"
                >
                  {{ user.bio || "这个人很懒，什么都没有写。" }}
                </p>

                <!-- 社交链接小图标 -->
                <div
                  class="flex gap-4 mt-4 justify-center md:justify-start"
                  v-if="user.socials"
                >
                  <a
                    v-if="user.socials.discord"
                    href="#"
                    class="text-[var(--text-secondary)] hover:text-[#5865F2] transition-colors flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-[var(--bg-layout-body)]"
                  >
                    <Icon name="simple-icons:discord" />
                    <span class="text-xs font-medium">{{
                      user.socials.discord
                    }}</span>
                  </a>
                  <a
                    v-if="user.socials.twitter"
                    href="#"
                    class="text-[var(--text-secondary)] hover:text-[#1DA1F2] transition-colors flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-[var(--bg-layout-body)]"
                  >
                    <Icon name="simple-icons:twitter" />
                    <span class="text-xs font-medium">{{
                      user.socials.twitter
                    }}</span>
                  </a>
                  <a
                    v-if="user.socials.twitch"
                    href="#"
                    class="text-[var(--text-secondary)] hover:text-[#9146FF] transition-colors flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-[var(--bg-layout-body)]"
                  >
                    <Icon name="simple-icons:twitch" />
                    <span class="text-xs font-medium">{{
                      user.socials.twitch
                    }}</span>
                  </a>
                </div>
              </div>

              <div
                class="flex gap-3 justify-center md:justify-end self-end mb-2"
              >
                <n-button
                  type="primary"
                  class="shadow-lg shadow-blue-500/20"
                  @click="startEditing"
                  v-if="!isEditing"
                >
                  编辑资料
                </n-button>
                <n-button secondary>
                  <template #icon><Icon name="heroicons:share" /></template>
                  分享
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧：主要内容区域 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 资料编辑/展示卡片 -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
          size="medium"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="heroicons:user-circle"
                class="text-[var(--color-primary)] text-xl"
              />
              <span>档案详情</span>
            </div>
          </template>

          <!-- 查看模式 -->
          <div v-if="!isEditing" class="py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label
                    class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider"
                    >用户名</label
                  >
                  <div class="text-[var(--text-main)] font-medium text-lg mt-1">
                    {{ user.username }}
                  </div>
                </div>
                <div>
                  <label
                    class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider"
                    >邮箱</label
                  >
                  <div
                    class="text-[var(--text-main)] font-medium text-lg mt-1 flex items-center gap-2"
                  >
                    {{ user.email }}
                    <n-tag size="small" type="success" :bordered="false" round
                      >已验证</n-tag
                    >
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label
                    class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider"
                    >注册时间</label
                  >
                  <div class="text-[var(--text-main)] font-medium text-lg mt-1">
                    2024-01-01
                  </div>
                </div>
                <div>
                  <label
                    class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider"
                    >UID</label
                  >
                  <div class="text-[var(--text-main)] font-medium text-lg mt-1">
                    #10001
                  </div>
                </div>
              </div>
              <div class="md:col-span-2">
                <label
                  class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider"
                  >个人简介</label
                >
                <div
                  class="text-[var(--text-main)] mt-2 bg-[var(--bg-layout-body)] p-4 rounded-lg leading-relaxed"
                >
                  {{ user.bio || "未填写" }}
                </div>
              </div>
            </div>
          </div>

          <!-- 编辑模式 -->
          <div v-else>
            <n-tabs type="segment" animated>
              <n-tab-pane name="basic" tab="基本资料">
                <n-form label-placement="top" class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <n-form-item label="用户名">
                      <n-input
                        v-model:value="editForm.username"
                        placeholder="输入用户名"
                      />
                    </n-form-item>
                    <n-form-item label="邮箱">
                      <n-input
                        v-model:value="editForm.email"
                        placeholder="输入邮箱"
                        disabled
                      />
                      <template #feedback
                        >邮箱不可修改，如需更改请联系管理员</template
                      >
                    </n-form-item>
                  </div>
                  <n-form-item label="个人简介">
                    <n-input
                      v-model:value="editForm.bio"
                      type="textarea"
                      placeholder="介绍一下你自己..."
                      :rows="4"
                    />
                  </n-form-item>
                </n-form>
              </n-tab-pane>

              <n-tab-pane name="appearance" tab="主页美化">
                <n-form label-placement="top" class="py-4">
                  <n-form-item label="头像链接">
                    <n-input
                      v-model:value="editForm.avatar"
                      placeholder="输入图片 URL"
                    />
                  </n-form-item>
                  <n-form-item label="Banner 背景图链接">
                    <n-input
                      v-model:value="editForm.banner"
                      placeholder="输入图片 URL (建议尺寸 1200x300)"
                    />
                  </n-form-item>
                  <div
                    class="bg-yellow-50 text-yellow-600 p-3 rounded text-sm border border-yellow-100 flex items-start gap-2"
                  >
                    <Icon
                      name="heroicons:information-circle"
                      class="text-lg shrink-0"
                    />
                    <span
                      >目前仅支持外部图片链接，请确保链接可公开访问。未来将支持本地上传。</span
                    >
                  </div>
                </n-form>
              </n-tab-pane>

              <n-tab-pane name="social" tab="社交账号">
                <n-form label-placement="top" class="py-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <n-form-item label="Discord">
                      <n-input
                        v-model:value="editForm.socials.discord"
                        placeholder="username#0000"
                      >
                        <template #prefix
                          ><Icon name="simple-icons:discord"
                        /></template>
                      </n-input>
                    </n-form-item>
                    <n-form-item label="Twitter / X">
                      <n-input
                        v-model:value="editForm.socials.twitter"
                        placeholder="@username"
                      >
                        <template #prefix
                          ><Icon name="simple-icons:twitter"
                        /></template>
                      </n-input>
                    </n-form-item>
                    <n-form-item label="Twitch">
                      <n-input
                        v-model:value="editForm.socials.twitch"
                        placeholder="Channel Name"
                      >
                        <template #prefix
                          ><Icon name="simple-icons:twitch"
                        /></template>
                      </n-input>
                    </n-form-item>
                    <n-form-item label="osu! Profile URL">
                      <n-input
                        v-model:value="editForm.socials.osu"
                        placeholder="https://osu.ppy.sh/users/..."
                      >
                        <template #prefix
                          ><span class="font-bold text-xs">osu!</span></template
                        >
                      </n-input>
                    </n-form-item>
                  </div>
                </n-form>
              </n-tab-pane>
            </n-tabs>

            <div
              class="flex justify-end gap-3 mt-4 pt-4 border-t border-[var(--border-color)]"
            >
              <n-button @click="cancelEditing">取消</n-button>
              <n-button type="primary" @click="handleSave">保存修改</n-button>
            </div>
          </div>
        </n-card>

        <!-- 比赛记录 (新增面板) -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
          size="medium"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="heroicons:trophy"
                class="text-[var(--color-warning)] text-xl"
              />
              <span>近期比赛记录</span>
            </div>
          </template>

          <n-data-table
            :columns="[
              { title: '赛事', key: 'event' },
              { title: '阶段', key: 'round' },
              { title: '对手', key: 'opponent' },
              {
                title: '结果',
                key: 'result',
                render: (row: any) =>
                  h(
                    'span',
                    {
                      class:
                        row.result === 'Win'
                          ? 'text-green-500 font-bold'
                          : 'text-red-500 font-bold',
                    },
                    row.result
                  ),
              },
              { title: '比分', key: 'score' },
              { title: '日期', key: 'date' },
            ]"
            :data="matchHistory"
            :bordered="false"
            size="small"
            :scroll-x="600"
          />
          <div class="text-center mt-4">
            <n-button text type="primary">查看更多历史记录</n-button>
          </div>
        </n-card>

        <!-- 最近活动 -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
          size="medium"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="heroicons:clock"
                class="text-[var(--color-info)] text-xl"
              />
              <span>动态</span>
            </div>
          </template>
          <div class="space-y-6 pl-2">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="flex gap-4 group"
            >
              <div class="mt-1 relative">
                <div
                  class="w-10 h-10 rounded-full bg-[var(--bg-layout-body)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300 z-10 relative shadow-sm border border-[var(--border-color)]"
                >
                  <Icon
                    v-if="activity.type === 'join'"
                    name="heroicons:flag"
                    class="text-lg"
                  />
                  <Icon
                    v-else-if="activity.type === 'comment'"
                    name="heroicons:chat-bubble-left"
                    class="text-lg"
                  />
                  <Icon v-else name="heroicons:trophy" class="text-lg" />
                </div>
                <div
                  class="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-[var(--border-color)] -z-0 opacity-50 last:hidden"
                ></div>
              </div>
              <div class="pb-2 pt-1">
                <p class="text-[var(--text-main)] font-medium">
                  {{ activity.content }}
                </p>
                <span class="text-xs text-[var(--text-secondary)]">{{
                  activity.time
                }}</span>
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 右侧：侧边栏 -->
      <div class="space-y-6">
        <!-- osu! 游戏信息 (新增) -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm overflow-hidden"
          size="small"
          v-if="user.socials?.osu"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <div
                class="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold shadow-sm shrink-0"
              >
                osu!
              </div>
              <span>游戏档案</span>
            </div>
          </template>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <n-avatar
                :size="64"
                :src="user.avatar || `https://a.ppy.sh/${user.id}`"
                class="ring-2 ring-pink-500/20"
                fallback-src="https://a.ppy.sh/1"
              />
              <div>
                <div class="font-bold text-lg leading-tight">
                  {{ user.username }}
                </div>
                <div
                  class="text-xs text-[var(--text-secondary)] mt-1 flex items-center gap-1"
                >
                  <Icon name="flag:cn-4x3" class="rounded-sm" /> China
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-center">
              <div class="bg-[var(--bg-layout-body)] p-2 rounded-lg">
                <div class="text-xs text-[var(--text-secondary)] uppercase">
                  Global Rank
                </div>
                <div class="font-bold text-pink-500">#1,234</div>
              </div>
              <div class="bg-[var(--bg-layout-body)] p-2 rounded-lg">
                <div class="text-xs text-[var(--text-secondary)] uppercase">
                  PP
                </div>
                <div class="font-bold text-[var(--text-main)]">12,456</div>
              </div>
              <div class="bg-[var(--bg-layout-body)] p-2 rounded-lg">
                <div class="text-xs text-[var(--text-secondary)] uppercase">
                  Accuracy
                </div>
                <div class="font-bold text-[var(--text-main)]">99.2%</div>
              </div>
              <div class="bg-[var(--bg-layout-body)] p-2 rounded-lg">
                <div class="text-xs text-[var(--text-secondary)] uppercase">
                  Play Count
                </div>
                <div class="font-bold text-[var(--text-main)]">45,678</div>
              </div>
            </div>

            <n-button
              block
              secondary
              tag="a"
              :href="user.socials.osu"
              target="_blank"
              class="!text-pink-500 !border-pink-500/20 hover:!bg-pink-50 dark:hover:!bg-pink-900/20"
            >
              访问 osu! 主页
            </n-button>
          </div>
        </n-card>

        <!-- 数据概览 -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm overflow-hidden"
          size="small"
          content-style="padding: 0;"
        >
          <div class="p-4 border-b border-[var(--border-color)]">
            <h3
              class="font-bold text-[var(--text-main)] flex items-center gap-2"
            >
              <Icon
                name="heroicons:chart-bar-square"
                class="text-[var(--color-primary)]"
              />
              生涯数据
            </h3>
          </div>
          <div
            class="grid grid-cols-2 divide-x divide-y divide-[var(--border-color)]"
          >
            <div
              class="p-6 text-center hover:bg-[var(--bg-layout-body)] transition-colors"
            >
              <div class="text-2xl font-bold text-[var(--color-primary)]">
                12
              </div>
              <div
                class="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-wider"
              >
                赛事
              </div>
            </div>
            <div
              class="p-6 text-center hover:bg-[var(--bg-layout-body)] transition-colors"
            >
              <div class="text-2xl font-bold text-[var(--color-success)]">
                3
              </div>
              <div
                class="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-wider"
              >
                冠军
              </div>
            </div>
            <div
              class="p-6 text-center hover:bg-[var(--bg-layout-body)] transition-colors"
            >
              <div class="text-2xl font-bold text-[var(--color-warning)]">
                85%
              </div>
              <div
                class="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-wider"
              >
                胜率
              </div>
            </div>
            <div
              class="p-6 text-center hover:bg-[var(--bg-layout-body)] transition-colors"
            >
              <div class="text-2xl font-bold text-[var(--color-error)]">
                1.2k
              </div>
              <div
                class="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-wider"
              >
                获赞
              </div>
            </div>
          </div>
        </n-card>

        <!-- 成就勋章 -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
          size="medium"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:star" class="text-yellow-500 text-xl" />
              <span>勋章墙</span>
            </div>
          </template>
          <div class="grid grid-cols-4 gap-2">
            <n-tooltip trigger="hover">
              <template #trigger>
                <div
                  class="aspect-square rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform shadow-sm"
                >
                  🏆
                </div>
              </template>
              冠军选手
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div
                  class="aspect-square rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform shadow-sm"
                >
                  🌟
                </div>
              </template>
              社区之星
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div
                  class="aspect-square rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform shadow-sm"
                >
                  🎮
                </div>
              </template>
              骨灰级玩家
            </n-tooltip>
            <div
              class="aspect-square rounded-lg bg-[var(--bg-layout-body)] flex items-center justify-center text-[var(--text-secondary)] border border-dashed border-[var(--border-color)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <Icon name="heroicons:plus" class="text-lg" />
            </div>
          </div>
        </n-card>

        <!-- 团队/组织 (新增) -->
        <n-card
          class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
          size="medium"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <Icon
                name="heroicons:user-group"
                class="text-[var(--color-success)] text-xl"
              />
              <span>所属团队</span>
            </div>
          </template>
          <div class="space-y-3">
            <div
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-layout-body)] transition-colors cursor-pointer"
            >
              <n-avatar
                size="small"
                src="https://placehold.co/50x50/ff5722/ffffff?text=YN"
              />
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">
                  Yuna Network
                </div>
                <div class="text-xs text-[var(--text-secondary)]">Owner</div>
              </div>
            </div>
            <div
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-layout-body)] transition-colors cursor-pointer"
            >
              <n-avatar
                size="small"
                src="https://placehold.co/50x50/2196f3/ffffff?text=OM"
              />
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">
                  Osu! Mania Team
                </div>
                <div class="text-xs text-[var(--text-secondary)]">Member</div>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>
