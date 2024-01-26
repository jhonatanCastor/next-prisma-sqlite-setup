"use client";

import { User } from "@prisma/client";
import React, { cache, use } from "react";

const getUsers = cache(() =>
  fetch("http://localhost:3000/api/users").then((res) => res.json())
);

export default function ListUsers() {
  let users = use<User[]>(getUsers());

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", textAlign: "center" }}
        >
          <div>
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{  margin: 40 }}
            />
            <div>
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
              <h3>{user.role}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
