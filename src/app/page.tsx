import axios from "axios";
import Image from "next/image";
import { MicrocmsResponse, QiitaResponse } from "@/domain/Article";
import { Suspense } from "react";
import Link from "next/link";

function CardSkeleton() {
  return (
    <div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-card-border bg-card"
        >
          <div className="skeleton h-40 w-full" />
          <div className="p-4">
            <div className="skeleton mb-2 h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function QiitaArticles() {

  const response = await axios.get<QiitaResponse[]>(
    "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
    {
      headers: {
        "Authorization": `Bearer ${process.env.QIITA_API_KEY}`
      }
    }
  );
  const items = response.data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F810513%2F04c6ef92-7b08-467f-95b0-efd05a0e7ea4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=255a4084e07534dc5871b77aa1318d0e"
  }));

  return (

    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url}
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-xl border border-card-border bg-card transition-all hover:border-qiita-green hover:shadow-lg"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-qiita-green">
              {item.title}
            </p>
            <span className="mt-2 inline-block rounded-full bg-qiita-green-light px-2.5 py-0.5 text-xs font-medium text-qiita-green">
              Qiita
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

async function MicrocmsArticles() {

  const response = await axios.get<MicrocmsResponse>(
    "https://6f60h6194x.microcms.io/api/v1/blogs",
    {
      headers: {
        "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`
      }
    }
  );

  const items = response.data.contents.map((item) => ({
    id: item.id,
    title: item.title,
    url: `/blogs/${item.id}`,
    image: item.eyecatch.url
  }));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="group overflow-hidden rounded-xl border border-card-border bg-card transition-all hover:border-accent hover:shadow-lg"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
              {item.title}
            </p>
            <span className="mt-2 inline-block rounded-full bg-accent-bg px-2.5 py-0.5 text-xs font-medium text-accent">
              Blog
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}


export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Tech Blog
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          QiitaとMicroCMSの最新記事をまとめてチェック
        </p>
      </section>

      {/* Qiita Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <span className="inline-block h-6 w-1 rounded-full bg-qiita-green" />
            Qiita 記事
          </h2>
          <Link
            href="/qiita"
            className="text-sm font-medium text-muted transition-colors hover:text-qiita-green"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <QiitaArticles />
        </Suspense>
      </section>

      {/* Blog Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <span className="inline-block h-6 w-1 rounded-full bg-accent" />
            ブログ記事
          </h2>
          <Link
            href="/blogs"
            className="text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <MicrocmsArticles />
        </Suspense>
      </section>
    </div>
  );
}
