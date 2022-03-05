<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="width: 390px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-text-subtitle2 text-bold">新增资源</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide"/>
      </div>
      <q-separator/>
      <q-scroll-area style="height: 290px; max-height: 50vh; padding: 16px">
        <q-form class="row q-gutter-md items-center">
          <q-select
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="type"
            emit-value
            map-options
            :options="[
              {
                label: '图片',
                value: '1',
              },
              {
                label: '视频',
                value: '2',
              },
            ]"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
              >文件类型：</span
              >
            </template>
          </q-select>
          <div class="row my-form-item">
            <div
              class="text-caption text-bold my-form-label"
              style="color: rgba(0, 0, 0, 0.54); margin-right: 6px"
            >
              文件地址：
            </div>
            <div class="flex1">
              <q-uploader
                ref="refUploader"
                style="width: 274px; box-shadow: none"
                bordered
                no-thumbnails
                field-name="file"
                @uploaded="onUploaded"
                @added="onAdded"
                @removed="onRemoved"
                url="/web/file/image_upload.json"
              />
              <!-- <q-btn color="primary">上传文件</q-btn> -->
              <q-input
                class="q-mt-xs"
                outlined
                dense
                placeholder="文件地址"
                disable
                v-model="resource"
              ></q-input>
            </div>
          </div>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="descMsg"
          >
            <!-- type="textarea" -->
            <template #before>
              <span class="text-caption text-bold my-form-label">备注：</span>
            </template>
          </q-input>
        </q-form>
      </q-scroll-area>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="onDialogHide"/>
        <q-btn label="确定" color="primary" @click="onSubmit"/>
      </q-card-actions>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em"/>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import {useDialogPluginComponent} from "quasar";
import {reactive, ref, toRaw, toRefs} from "vue";
import {RESOURCE} from "src/api/module";
import {notifyWarn} from "src/util/common";

export default {
  emits: [...useDialogPluginComponent.emits],
  components: {},
  props: {},
  setup(props) {
    const {dialogRef, onDialogOK, onDialogHide} = useDialogPluginComponent();

    let formData = reactive({
      type: "1",
      fileSize: 0,
      resource: "",
      descMsg: "",
    });
    const loading = ref(false);
    const refUploader = ref(null)

    // 增加按钮事件
    const onAdded = (info) => {
      formData.fileSize = 0;
      formData.resource = "";
    };
    // 删除按钮事件
    const onRemoved = (info) => {
      formData.fileSize = 0;
      formData.resource = "";
    };
    // 上传文件完成事件
    const onUploaded = (info) => {
      const {xhr} = info;
      const {status, statusText, responseText} = xhr;
      if (status !== 200 && statusText !== 'ok') return
      try {
        const res = JSON.parse(responseText)
        const {code, msg} = res
        if (code === 2000) {
          console.log('info',info)
          const [file] = info.files
          const { result} = res
          formData.resource = result.resource
          // formData.fileSize = file['__sizeLabel'];
          formData.fileSize = 0;
        } else {
          notifyWarn(msg || '上传失败')
          refUploader.value.reset()
        }
      } catch (e) {
        console.error(e)
      }
    };
    // 提交表单按钮事件
    const onSubmit = () => {
      loading.value = true;
      // const {type,...param} = toRaw(formData);
      const param = toRaw(formData);
      RESOURCE.insert(param)
        .then(() => {
          onDialogOK();
        })
        .catch(() => {
        })
        .finally(() => {
          loading.value = false;
        });

    };
    return {
      dialogRef,
      refUploader,
      ...toRefs(formData),
      loading,

      onSubmit,
      onDialogHide,

      onUploaded,
      onAdded,
      onRemoved,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 350px;
}

.my-form-label {
  min-width: 70px;
  max-width: 70px;
  text-align: right;
  word-wrap: break-word;
}
</style>
