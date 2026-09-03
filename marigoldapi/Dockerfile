FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

COPY src src
RUN ./mvnw -B clean package -DskipTests
RUN ./mvnw -q -B dependency:copy-dependencies -DoutputDirectory=target/dependency -DincludeScope=runtime

RUN mkdir -p /build-cache/onnx && \
    java -cp "target/classes:target/dependency/*" \
    com.marigold.marigoldapi.buildtools.EmbeddingModelWarmup /build-cache/onnx

FROM eclipse-temurin:21-jre-jammy AS runtime
WORKDIR /app

RUN useradd -r -u 1001 -m spring && mkdir -p /app/.onnx-cache && chown -R spring:spring /app
ENV HOME=/home/spring
USER spring

COPY --from=build --chown=spring:spring /app/target/*.jar app.jar
COPY --from=build --chown=spring:spring /build-cache/onnx /app/.onnx-cache
COPY --from=build --chown=spring:spring /root/.djl.ai /home/spring/.djl.ai

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
