'use server'

import { revalidatePath } from "next/cache"



export async function reloadBlog(formData: FormData) {
    const id = formData.get('id') as string;
    revalidatePath(`/blogs/${id}`)
}