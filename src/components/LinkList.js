import React from "react";
import Link from "./Link";

const LinkList = () => {
  const linksToRender = [
      {
      id: '1',
      description: 'link about Prisma',
      url: 'https://prisma.io'
      },
      {
      id: '2',
      description: 'link about Prisma 2',
      url: 'https://prisma2.io'
      }
  ];

  return (
      <div>
        {linksToRender.map((link) => (
          <Link key={link.id} link={link} />
        ))}
      </div>
  );
}

export default LinkList;

