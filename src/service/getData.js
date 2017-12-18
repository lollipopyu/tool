import fetch from "@/config/fetch"
/**
 * 保存
 */
export const save = data => fetch("insert", data, "POST");