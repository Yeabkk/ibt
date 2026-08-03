def dfs(graph, start, visited=None):

    if visited is None:
        visited = []


    visited.append(start)


    for neighbor in graph[start]:

        if neighbor not in visited:
            dfs(graph, neighbor, visited)


    return visited



graph = {

    "A": ["B", "C"],

    "B": ["D"],

    "C": ["E"],

    "D": [],

    "E": []

}



print(dfs(graph, "A"))