from collections import deque


def bfs(graph, start):

    visited = set()

    queue = deque([start])


    while queue:

        vertex = queue.popleft()

        if vertex not in visited:

            visited.add(vertex)

            for neighbor in graph[vertex]:
                queue.append(neighbor)


    return visited



graph = {

    "A": ["B", "C"],

    "B": ["D"],

    "C": ["E"],

    "D": [],

    "E": []

}


print(bfs(graph, "A"))